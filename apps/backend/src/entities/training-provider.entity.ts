import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';
import { Loan } from './loan.entity';

export enum TPStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
  INACTIVE = 'inactive',
}

export enum TPAccreditationType {
  NCVET = 'ncvet', // National Council for Vocational Education and Training
  NSDC = 'nsdc',   // National Skill Development Corporation
  STATE = 'state', // J&K State accreditation
  SECTOR_SKILL_COUNCIL = 'ssc',
}

/**
 * Training Provider Entity
 * 
 * Represents accredited training institutions that offer skill courses.
 * Includes TPScore calculation components for risk assessment.
 */
@Entity('training_providers')
@Index(['registrationNumber'], { unique: true })
export class TrainingProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'legal_name', length: 255 })
  legalName: string;

  @Column({ name: 'registration_number', length: 100 })
  registrationNumber: string;

  @Column({
    type: 'enum',
    enum: TPStatus,
    default: TPStatus.PENDING_APPROVAL,
  })
  status: TPStatus;

  // Accreditation
  @Column({
    name: 'accreditation_type',
    type: 'enum',
    enum: TPAccreditationType,
    nullable: true,
  })
  accreditationType: TPAccreditationType;

  @Column({ name: 'accreditation_number', nullable: true })
  accreditationNumber: string;

  @Column({ name: 'accreditation_valid_until', type: 'date', nullable: true })
  accreditationValidUntil: Date;

  // Contact Information
  @Column()
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ nullable: true })
  website: string;

  // Address
  @Column({ name: 'address_line1' })
  addressLine1: string;

  @Column({ name: 'address_line2', nullable: true })
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column({ default: 'Jammu and Kashmir' })
  state: string;

  @Column({ name: 'pin_code', length: 6 })
  pinCode: string;

  // Banking Details
  @Column({ name: 'bank_account_number' })
  bankAccountNumber: string;

  @Column({ name: 'bank_ifsc' })
  bankIfsc: string;

  @Column({ name: 'bank_name' })
  bankName: string;

  @Column({ name: 'bank_branch' })
  bankBranch: string;

  // Legal Documents
  @Column({ name: 'gst_number', nullable: true })
  gstNumber: string;

  @Column({ name: 'pan_number' })
  panNumber: string;

  // TPScore Components (as per Risk & Credit Policy)
  
  // Completion Rate (30% of TPScore)
  @Column({
    name: 'completion_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  completionRate: number;

  // Certification Rate (25% of TPScore) - baseline should be >= 62%
  @Column({
    name: 'certification_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  certificationRate: number;

  // Placement Rate (20% of TPScore)
  @Column({
    name: 'placement_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  placementRate: number;

  // Refund History (15% of TPScore)
  @Column({ name: 'total_guarantee_claims', default: 0 })
  totalGuaranteeClaims: number;

  @Column({ name: 'total_guarantee_amount_claimed', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalGuaranteeAmountClaimed: number;

  // Audit & Compliance (10% of TPScore)
  @Column({ name: 'last_audit_date', type: 'date', nullable: true })
  lastAuditDate: Date;

  @Column({
    name: 'audit_score',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  auditScore: number;

  @Column({ name: 'compliance_violations', default: 0 })
  complianceViolations: number;

  // Calculated TPScore
  @Column({
    name: 'tp_score',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  tpScore: number;

  @Column({ name: 'tp_score_components', type: 'jsonb', nullable: true })
  tpScoreComponents: {
    completionScore: number;
    certificationScore: number;
    placementScore: number;
    refundHistoryScore: number;
    auditScore: number;
  };

  @Column({ name: 'tp_score_updated_at', type: 'timestamptz', nullable: true })
  tpScoreUpdatedAt: Date;

  // Guarantee Deposit
  @Column({
    name: 'guarantee_deposit_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  guaranteeDepositAmount: number;

  @Column({
    name: 'guarantee_deposit_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 25,
  })
  guaranteeDepositPercentage: number;

  @Column({
    name: 'available_guarantee_balance',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  availableGuaranteeBalance: number;

  // Statistics
  @Column({ name: 'total_learners_enrolled', default: 0 })
  totalLearnersEnrolled: number;

  @Column({ name: 'total_learners_certified', default: 0 })
  totalLearnersCertified: number;

  @Column({ name: 'total_learners_placed', default: 0 })
  totalLearnersPlaced: number;

  @Column({ name: 'total_loans_disbursed', type: 'decimal', precision: 14, scale: 2, default: 0 })
  totalLoansDisbursed: number;

  // Capacity
  @Column({ name: 'max_batch_capacity', default: 50 })
  maxBatchCapacity: number;

  @Column({ name: 'current_active_batches', default: 0 })
  currentActiveBatches: number;

  // Sectors/Specializations
  @Column({ type: 'jsonb', default: '[]' })
  sectors: string[];

  // Primary Contact (TP Admin User)
  @Column({ name: 'primary_contact_user_id', nullable: true })
  primaryContactUserId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'primary_contact_user_id' })
  primaryContactUser: User;

  // Relations
  @OneToMany(() => Course, (course) => course.trainingProvider)
  courses: Course[];

  @OneToMany(() => Loan, (loan) => loan.trainingProvider)
  loans: Loan[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

