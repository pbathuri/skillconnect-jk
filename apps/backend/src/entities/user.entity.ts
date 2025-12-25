import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Loan } from './loan.entity';
import { LearnerProfile } from './learner-profile.entity';

export enum UserRole {
  LEARNER = 'learner',
  TRAINING_PROVIDER = 'training_provider',
  BANK_OFFICER = 'bank_officer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum UserStatus {
  PENDING_VERIFICATION = 'pending_verification',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

export enum KycStatus {
  NOT_INITIATED = 'not_initiated',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

/**
 * User Entity
 * 
 * Represents all users in the system including learners, training providers,
 * bank officers, and administrators.
 */
@Entity('users')
@Index(['email'], { unique: true })
@Index(['phone'], { unique: true, where: '"phone" IS NOT NULL' })
@Index(['aadhaarNumber'], { unique: true, where: '"aadhaar_number" IS NOT NULL' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ name: 'password_hash' })
  @Exclude()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.LEARNER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING_VERIFICATION,
  })
  status: UserStatus;

  // KYC Information
  @Column({
    name: 'kyc_status',
    type: 'enum',
    enum: KycStatus,
    default: KycStatus.NOT_INITIATED,
  })
  kycStatus: KycStatus;

  @Column({ name: 'aadhaar_number', length: 12, nullable: true })
  @Exclude()
  aadhaarNumber: string;

  @Column({ name: 'aadhaar_verified', default: false })
  aadhaarVerified: boolean;

  @Column({ name: 'pan_number', length: 10, nullable: true })
  panNumber: string;

  @Column({ name: 'digilocker_id', nullable: true })
  digilockerId: string;

  // Address
  @Column({ name: 'address_line1', nullable: true })
  addressLine1: string;

  @Column({ name: 'address_line2', nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'pin_code', length: 6, nullable: true })
  pinCode: string;

  // Profile
  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ name: 'profile_photo_url', nullable: true })
  profilePhotoUrl: string;

  @Column({ name: 'preferred_language', default: 'en' })
  preferredLanguage: string;

  // Bank Account (for learners receiving refunds)
  @Column({ name: 'bank_account_number', nullable: true })
  @Exclude()
  bankAccountNumber: string;

  @Column({ name: 'bank_ifsc', nullable: true })
  bankIfsc: string;

  @Column({ name: 'bank_name', nullable: true })
  bankName: string;

  // Security
  @Column({ name: 'refresh_token', nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ name: 'last_login', type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ name: 'failed_login_attempts', default: 0 })
  failedLoginAttempts: number;

  @Column({ name: 'locked_until', type: 'timestamptz', nullable: true })
  lockedUntil: Date;

  // Relations
  @OneToMany(() => Loan, (loan) => loan.learner)
  loans: Loan[];

  @OneToOne(() => LearnerProfile, (profile) => profile.user, { nullable: true })
  learnerProfile: LearnerProfile;

  // Metadata
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Computed property for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

