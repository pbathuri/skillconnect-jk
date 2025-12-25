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

export enum RepaymentStatus {
  SCHEDULED = 'scheduled',
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PARTIAL = 'partial',
  OVERDUE = 'overdue',
  WAIVED = 'waived',
}

export enum PaymentMethod {
  UPI_AUTOPAY = 'upi_autopay',
  UPI_MANUAL = 'upi_manual',
  NEFT = 'neft',
  RTGS = 'rtgs',
  IMPS = 'imps',
  NACH = 'nach',
  CASH = 'cash',
  CHEQUE = 'cheque',
  GUARANTEE_CLAIM = 'guarantee_claim', // From TP guarantee
  CGFSSD_CLAIM = 'cgfssd_claim', // From credit guarantee fund
}

/**
 * Repayment Entity
 * 
 * Tracks EMI payments with step-up EMI structure.
 * First 6 EMIs at 50% of standard amount, then full EMIs.
 */
@Entity('repayments')
@Index(['loanId'])
@Index(['status'])
@Index(['dueDate'])
export class Repayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'loan_id' })
  loanId: string;

  @ManyToOne(() => Loan, (loan) => loan.repayments)
  @JoinColumn({ name: 'loan_id' })
  loan: Loan;

  @Column({
    type: 'enum',
    enum: RepaymentStatus,
    default: RepaymentStatus.SCHEDULED,
  })
  status: RepaymentStatus;

  // EMI Details
  @Column({ name: 'emi_number' })
  emiNumber: number;

  @Column({ name: 'is_step_up_emi', default: false })
  isStepUpEmi: boolean; // True for first 6 EMIs (at 50%)

  // Amounts
  @Column({
    name: 'principal_component',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  principalComponent: number;

  @Column({
    name: 'interest_component',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  interestComponent: number;

  @Column({
    name: 'emi_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  emiAmount: number;

  @Column({
    name: 'late_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  lateFee: number;

  @Column({
    name: 'total_due',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalDue: number;

  @Column({
    name: 'amount_paid',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  amountPaid: number;

  @Column({
    name: 'outstanding_after_payment',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  outstandingAfterPayment: number;

  // Schedule
  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ name: 'grace_period_end', type: 'date', nullable: true })
  gracePeriodEnd: Date;

  // Payment Details
  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date', type: 'timestamptz', nullable: true })
  paymentDate: Date;

  @Column({ name: 'transaction_reference', nullable: true })
  transactionReference: string;

  @Column({ name: 'utr_number', nullable: true })
  utrNumber: string;

  @Column({ name: 'bank_reference', nullable: true })
  bankReference: string;

  // UPI AutoPay specific
  @Column({ name: 'autopay_attempt_count', default: 0 })
  autopayAttemptCount: number;

  @Column({ name: 'last_autopay_attempt', type: 'timestamptz', nullable: true })
  lastAutopayAttempt: Date;

  @Column({ name: 'autopay_failure_reason', nullable: true })
  autopayFailureReason: string;

  // Delinquency
  @Column({ name: 'days_overdue', default: 0 })
  daysOverdue: number;

  @Column({ name: 'reminder_sent', default: false })
  reminderSent: boolean;

  @Column({ name: 'reminder_sent_at', type: 'timestamptz', nullable: true })
  reminderSentAt: Date;

  // Guarantee Claims (for defaults)
  @Column({ name: 'tp_guarantee_claimed', type: 'decimal', precision: 10, scale: 2, default: 0 })
  tpGuaranteeClaimed: number;

  @Column({ name: 'cgfssd_claimed', type: 'decimal', precision: 10, scale: 2, default: 0 })
  cgfssdClaimed: number;

  // Waivers (for force majeure situations)
  @Column({ name: 'waiver_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  waiverAmount: number;

  @Column({ name: 'waiver_reason', nullable: true })
  waiverReason: string;

  @Column({ name: 'waived_by', nullable: true })
  waivedBy: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

