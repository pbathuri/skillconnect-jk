import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from '../../entities/user.entity';
import { LearnerProfile } from '../../entities/learner-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LearnerProfile)
    private readonly learnerProfileRepository: Repository<LearnerProfile>,
  ) {}

  async findAll(query: {
    role?: UserRole;
    status?: UserStatus;
    page?: number;
    limit?: number;
  }) {
    const { role, status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await this.userRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['learnerProfile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);

    // Prevent updating sensitive fields
    delete data.passwordHash;
    delete data.refreshToken;
    delete data.role;

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async updateLearnerProfile(
    userId: string,
    data: Partial<LearnerProfile>,
  ): Promise<LearnerProfile> {
    let profile = await this.learnerProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = this.learnerProfileRepository.create({ userId, ...data });
    } else {
      Object.assign(profile, data);
    }

    return this.learnerProfileRepository.save(profile);
  }

  async getLearnerProfile(userId: string): Promise<LearnerProfile | null> {
    return this.learnerProfileRepository.findOne({
      where: { userId },
    });
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    const user = await this.findById(id);
    user.status = status;
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  async getDashboardStats() {
    const totalUsers = await this.userRepository.count();
    const learners = await this.userRepository.count({
      where: { role: UserRole.LEARNER },
    });
    const activeUsers = await this.userRepository.count({
      where: { status: UserStatus.ACTIVE },
    });
    const verifiedUsers = await this.userRepository.count({
      where: { aadhaarVerified: true },
    });

    return {
      totalUsers,
      learners,
      activeUsers,
      verifiedUsers,
      verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
    };
  }
}

