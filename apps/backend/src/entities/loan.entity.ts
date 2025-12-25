import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { TrainingProvider } from './training-provider.entity';
import { Bank } from './bank.entity';
import { Disbursement } from './disbursement.entity';
import { Repayment } from './repayment.entity';

export enum LoanStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  DOCUMENTS_PENDING = 'documents_pending',
  KYC_PENDING = 'kyc_pending',
  KYC_VERIFIED = 'kyc_verified',
  BANK_SUBMITTED = 'bank_submitted',
  BANK_APPROVED = 'bank_approved',
  BANK_REJECTED = 'bank_rejected',
  ACTIVE = 'active',
  DISBURSEMENT_IN_PROGRESS = 'disbursement_in_progress',
  FULLY_DISBURSED = 'fully_disbursed',
  IN_MORATORIUM = 'in_moratorium',
  IN_REPAYMENT = 'in_repayment',
  DELINQUENT = 'delinquent',
  NPA = 'npa', // Non-Performing Asset
  CLOSED = 'closed',
  WRITTEN_OFF = 'written_off',
  CANCELLED = 'cancelled',
}

export enum LoanPurpose {
  COURSE_FEE = 'course_fee',
  COURSE_FEE_AND_DEVICE = 'course_fee_and_device',
  CERTIFICATION = 'certification',
}

/**
 * Loan Entity
 * 
 * Core entity representing skill development loans.
 * Implements milestone-based disbursement and step-up EMI schedule.
 */
@Entity('loans')
@Index(['status'])
@Index(['learnerId'])
@Index(['applicationNumber'], { unique: true })
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'application_number', unique: true })
  applicationNumber: string;

  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.DRAFT,
  })
  status: LoanStatus;

  @Column({
    type: 'enum',
    enum: LoanPurpose,
    default: LoanPurpose.COURSE_FEE,
  })
  purpose: LoanPurpose;

  // Learner (Borrower)
  @Column({ name: 'learner_id' })
  learnerId: string;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'learner_id' })
  learner: User;

  // Course
  @Column({ name: 'course_id' })
  courseId: string;

  @ManyToOne(() => Course, (course) => course.loans)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  // Training Provider
  @Column({ name: 'training_provider_id' })
  trainingProviderId: string;

  @ManyToOne(() => TrainingProvider, (tp) => tp.loans)
  @JoinColumn({ name: 'training_provider_id' })
  trainingProvider: TrainingProvider;

  // Bank
  @Column({ name: 'bank_id', nullable: true })
  bankId: string;

  @ManyToOne(() => Bank, { nullable: true })
  @JoinColumn({ name: 'bank_id' })
  bank: Bank;

  @Column({ name: 'bank_application_id', nullable: true })
  bankApplicationId: string;

  @Column({ name: 'bank_loan_account_number', nullable: true })
  bankLoanAccountNumber: string;

  // Loan Amounts
  @Column({
    name: 'requested_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  requestedAmount: number;

  @Column({
    name: 'approved_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  approvedAmount: number;

  @Column({
    name: 'disbursed_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  disbursedAmount: number;

  @Column({
    name: 'outstanding_principal',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  outstandingPrincipal: number;

  @Column({
    name: 'outstanding_interest',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  outstandingInterest: number;

  @Column({
    name: 'total_repaid',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  totalRepaid: number;

  // Device amount (if purpose includes device)
  @Column({
    name: 'device_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  deviceAmount: number;

  // Interest & Pricing (based on Borrower Score)
  @Column({
    name: 'interest_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  interestRate: number;

  @Column({
    name: 'mclr_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  mclrRate: number;

  @Column({
    name: 'spread_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  spreadRate: number;

  // Risk Assessment
  @Column({
    name: 'borrower_score_at_application',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  borrowerScoreAtApplication: number;

  @Column({
    name: 'tp_score_at_application',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  tpScoreAtApplication: number;

  @Column({ name: 'risk_category', nullable: true })
  riskCategory: string;

  // Tenure
  @Column({ name: 'tenure_months', nullable: true })
  tenureMonths: number;

  @Column({ name: 'moratorium_months', default: 3 })
  moratoriumMonths: number;

  // EMI Details
  @Column({
    name: 'emi_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  emiAmount: number;

  @Column({
    name: 'step_up_emi_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  stepUpEmiAmount: number; // First 6 EMIs at 50%

  @Column({ name: 'total_emis', nullable: true })
  totalEmis: number;

  @Column({ name: 'emis_paid', default: 0 })
  emisPaid: number;

  // Milestone Progress
  @Column({ name: 'current_milestone', default: 0 })
  currentMilestone: number;

  @Column({ name: 'milestone_progress', type: 'jsonb', default: '[]' })
  milestoneProgress: {
    milestone: number;
    name: string;
    targetPercentage: number;
    actualPercentage: number;
    disbursementPercentage: number;
    status: 'pending' | 'in_progress' | 'verified' | 'disbursed';
    verifiedAt?: Date;
    disbursedAt?: Date;
    disbursementId?: string;
  }[];

  // Course Progress
  @Column({
    name: 'course_completion_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  courseCompletionPercentage: number;

  @Column({ name: 'attendance_percentage', type: 'decimal', precision: 5, scale: 2, default: 0 })
  attendancePercentage: number;

  @Column({ name: 'assessment_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  assessmentScore: number;

  @Column({ name: 'is_certified', default: false })
  isCertified: boolean;

  @Column({ name: 'certification_date', type: 'date', nullable: true })
  certificationDate: Date;

  @Column({ name: 'is_placed', default: false })
  isPlaced: boolean;

  @Column({ name: 'placement_date', type: 'date', nullable: true })
  placementDate: Date;

  @Column({ name: 'placement_employer', nullable: true })
  placementEmployer: string;

  @Column({ name: 'placement_salary', type: 'decimal', precision: 10, scale: 2, nullable: true })
  placementSalary: number;

  // Guarantee & Coverage
  @Column({
    name: 'cgfssd_covered',
    default: true,
  })
  cgfssdCovered: boolean;

  @Column({
    name: 'cgfssd_coverage_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 75,
  })
  cgfssdCoveragePercentage: number;

  @Column({
    name: 'tp_guarantee_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  tpGuaranteeAmount: number;

  // UPI AutoPay
  @Column({ name: 'upi_mandate_id', nullable: true })
  upiMandateId: string;

  @Column({ name: 'upi_mandate_status', nullable: true })
  upiMandateStatus: string;

  @Column({ name: 'upi_vpa', nullable: true })
  upiVpa: string;

  // Important Dates
  @Column({ name: 'application_date', type: 'timestamptz', nullable: true })
  applicationDate: Date;

  @Column({ name: 'approval_date', type: 'timestamptz', nullable: true })
  approvalDate: Date;

  @Column({ name: 'course_start_date', type: 'date', nullable: true })
  courseStartDate: Date;

  @Column({ name: 'course_end_date', type: 'date', nullable: true })
  courseEndDate: Date;

  @Column({ name: 'moratorium_end_date', type: 'date', nullable: true })
  moratoriumEndDate: Date;

  @Column({ name: 'first_emi_date', type: 'date', nullable: true })
  firstEmiDate: Date;

  @Column({ name: 'last_emi_date', type: 'date', nullable: true })
  lastEmiDate: Date;

  @Column({ name: 'closure_date', type: 'timestamptz', nullable: true })
  closureDate: Date;

  // Delinquency
  @Column({ name: 'days_past_due', default: 0 })
  daysPastDue: number;

  @Column({ name: 'consecutive_missed_emis', default: 0 })
  consecutiveMissedEmis: number;

  @Column({ name: 'total_missed_emis', default: 0 })
  totalMissedEmis: number;

  // Co-signer (if required for moderate risk)
  @Column({ name: 'has_cosigner', default: false })
  hasCosigner: boolean;

  @Column({ name: 'cosigner_name', nullable: true })
  cosignerName: string;

  @Column({ name: 'cosigner_aadhaar', nullable: true })
  cosignerAadhaar: string;

  @Column({ name: 'cosigner_phone', nullable: true })
  cosignerPhone: string;

  // Documents
  @Column({ name: 'documents', type: 'jsonb', default: '[]' })
  documents: {
    type: string;
    name: string;
    url: string;
    uploadedAt: Date;
    verified: boolean;
  }[];

  // Relations
  @OneToMany(() => Disbursement, (disbursement) => disbursement.loan)
  disbursements: Disbursement[];

  @OneToMany(() => Repayment, (repayment) => repayment.loan)
  repayments: Repayment[];

  // Audit fields
  @Column({ name: 'submitted_by', nullable: true })
  submittedBy: string;

  @Column({ name: 'reviewed_by', nullable: true })
  reviewedBy: string;

  @Column({ name: 'approved_by', nullable: true })
  approvedBy: string;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

