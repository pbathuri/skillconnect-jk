import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Loan } from './loan.entity';

export enum DisbursementStatus {
  PENDING = 'pending',
  MILESTONE_VERIFIED = 'milestone_verified',
  BANK_INITIATED = 'bank_initiated',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}

export enum DisbursementType {
  MILESTONE = 'milestone', // Regular milestone disbursement to TP
  DEVICE = 'device', // Device purchase disbursement
  REFUND_TO_LEARNER = 'refund_to_learner', // Refund from TP guarantee to learner
  REFUND_TO_BANK = 'refund_to_bank', // Guarantee claim to bank
}

/**
 * Disbursement Entity
 * 
 * Tracks milestone-based disbursements from escrow to training providers.
 * Implements T0-T3 disbursement schedule: 30%, 30%, 20%, 20%
 */
@Entity('disbursements')
@Index(['loanId'])
@Index(['status'])
@Index(['transactionReference'], { unique: true, where: '"transaction_reference" IS NOT NULL' })
export class Disbursement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'loan_id' })
  loanId: string;

  @ManyToOne(() => Loan, (loan) => loan.disbursements)
  @JoinColumn({ name: 'loan_id' })
  loan: Loan;

  @Column({
    type: 'enum',
    enum: DisbursementStatus,
    default: DisbursementStatus.PENDING,
  })
  status: DisbursementStatus;

  @Column({
    type: 'enum',
    enum: DisbursementType,
    default: DisbursementType.MILESTONE,
  })
  type: DisbursementType;

  // Milestone Information
  @Column({ name: 'milestone_number' })
  milestoneNumber: number;

  @Column({ name: 'milestone_name' })
  milestoneName: string;

  @Column({
    name: 'milestone_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  milestonePercentage: number;

  // Amount
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  amount: number;

  // Recipient Information
  @Column({ name: 'recipient_type' })
  recipientType: 'training_provider' | 'learner' | 'bank';

  @Column({ name: 'recipient_id' })
  recipientId: string;

  @Column({ name: 'recipient_account_number' })
  recipientAccountNumber: string;

  @Column({ name: 'recipient_ifsc' })
  recipientIfsc: string;

  @Column({ name: 'recipient_name' })
  recipientName: string;

  // Bank Transaction Details
  @Column({ name: 'transaction_reference', nullable: true })
  transactionReference: string;

  @Column({ name: 'bank_reference_number', nullable: true })
  bankReferenceNumber: string;

  @Column({ name: 'utr_number', nullable: true })
  utrNumber: string;

  // Verification
  @Column({ name: 'course_completion_at_disbursement', type: 'decimal', precision: 5, scale: 2, nullable: true })
  courseCompletionAtDisbursement: number;

  @Column({ name: 'attendance_at_disbursement', type: 'decimal', precision: 5, scale: 2, nullable: true })
  attendanceAtDisbursement: number;

  @Column({ name: 'verified_by', nullable: true })
  verifiedBy: string;

  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verifiedAt: Date;

  // Processing
  @Column({ name: 'initiated_at', type: 'timestamptz', nullable: true })
  initiatedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date;

  @Column({ name: 'failed_at', type: 'timestamptz', nullable: true })
  failedAt: Date;

  @Column({ name: 'failure_reason', nullable: true })
  failureReason: string;

  @Column({ name: 'retry_count', default: 0 })
  retryCount: number;

  // Escrow tracking
  @Column({ name: 'escrow_reference', nullable: true })
  escrowReference: string;

  @Column({ name: 'escrow_balance_before', type: 'decimal', precision: 12, scale: 2, nullable: true })
  escrowBalanceBefore: number;

  @Column({ name: 'escrow_balance_after', type: 'decimal', precision: 12, scale: 2, nullable: true })
  escrowBalanceAfter: number;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

