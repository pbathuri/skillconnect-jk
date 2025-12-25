import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus, KycStatus } from '../../entities/user.entity';
import { LearnerProfile } from '../../entities/learner-profile.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: Partial<User>;
}

/**
 * Authentication Service
 * 
 * Handles user registration, login, token management, and KYC initiation.
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LearnerProfile)
    private readonly learnerProfileRepository: Repository<LearnerProfile>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto): Promise<TokenResponse> {
    const { email, phone, password, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, ...(phone ? [{ phone }] : [])],
    });

    if (existingUser) {
      throw new ConflictException(
        existingUser.email === email
          ? 'Email already registered'
          : 'Phone number already registered',
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      email,
      phone,
      passwordHash,
      status: UserStatus.PENDING_VERIFICATION,
      kycStatus: KycStatus.NOT_INITIATED,
    });

    await this.userRepository.save(user);

    // If learner, create profile
    if (user.role === UserRole.LEARNER) {
      const learnerProfile = this.learnerProfileRepository.create({
        userId: user.id,
      });
      await this.learnerProfileRepository.save(learnerProfile);
    }

    // Generate tokens
    return this.generateTokens(user);
  }

  /**
   * Authenticate user with email/phone and password
   */
  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const { identifier, password } = loginDto;

    // Find user by email or phone
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      throw new UnauthorizedException(
        `Account locked. Try again after ${user.lockedUntil.toISOString()}`,
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      // Increment failed attempts
      user.failedLoginAttempts += 1;

      // Lock account after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        user.failedLoginAttempts = 0;
      }

      await this.userRepository.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is suspended
    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException('Account is suspended');
    }

    // Reset failed attempts and update last login
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return this.generateTokens(user);
  }

  /**
   * Validate user for JWT strategy
   */
  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user || user.status === UserStatus.SUSPENDED) {
      return null;
    }

    return user;
  }

  /**
   * Validate user credentials for local strategy
   */
  async validateCredentials(identifier: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Logout user by invalidating refresh token
   */
  async logout(userId: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  /**
   * Initiate KYC verification via DigiLocker
   */
  async initiateKyc(userId: string): Promise<{ redirectUrl: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Update KYC status
    user.kycStatus = KycStatus.PENDING;
    await this.userRepository.save(user);

    // In production, this would redirect to DigiLocker OAuth
    // For now, return mock URL
    const digilockerUrl = this.configService.get<string>('integrations.digilocker.apiUrl');
    const clientId = this.configService.get<string>('integrations.digilocker.clientId');
    const redirectUrl = `${digilockerUrl}/authorize?client_id=${clientId}&user_id=${userId}`;

    return { redirectUrl };
  }

  /**
   * Handle KYC callback from DigiLocker
   */
  async handleKycCallback(
    userId: string,
    kycData: {
      aadhaarNumber: string;
      name: string;
      dateOfBirth: string;
      address: string;
      verified: boolean;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (kycData.verified) {
      user.kycStatus = KycStatus.VERIFIED;
      user.aadhaarNumber = kycData.aadhaarNumber;
      user.aadhaarVerified = true;
      user.status = UserStatus.ACTIVE;

      // Update address from Aadhaar if available
      if (kycData.address) {
        user.addressLine1 = kycData.address;
      }
    } else {
      user.kycStatus = KycStatus.REJECTED;
    }

    return this.userRepository.save(user);
  }

  /**
   * Generate JWT access and refresh tokens
   */
  private async generateTokens(user: User): Promise<TokenResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });

    // Store refresh token
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('jwt.expiresIn') || '1d',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        kycStatus: user.kycStatus,
        preferredLanguage: user.preferredLanguage,
      },
    };
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const saltRounds = 10;
    user.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    user.refreshToken = null; // Invalidate all sessions

    await this.userRepository.save(user);
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['learnerProfile'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}

