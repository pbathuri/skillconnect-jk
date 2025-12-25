import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum BankStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum BankType {
  PSU = 'psu', // Public Sector Undertaking
  PRIVATE = 'private',
  COOPERATIVE = 'cooperative',
  SMALL_FINANCE = 'small_finance',
  REGIONAL_RURAL = 'regional_rural',
}

/**
 * Bank Entity
 * 
 * Represents partner banks that provide skill loans.
 * Initially designed for single PSU bank pilot, with aggregator support planned.
 */
@Entity('banks')
@Index(['bankCode'], { unique: true })
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'bank_code', length: 20, unique: true })
  bankCode: string;

  @Column({
    type: 'enum',
    enum: BankStatus,
    default: BankStatus.ACTIVE,
  })
  status: BankStatus;

  @Column({
    type: 'enum',
    enum: BankType,
    default: BankType.PSU,
  })
  type: BankType;

  // Contact
  @Column()
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ nullable: true })
  website: string;

  // Address
  @Column({ name: 'head_office_address' })
  headOfficeAddress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'pin_code', length: 6 })
  pinCode: string;

  // API Integration
  @Column({ name: 'api_base_url', nullable: true })
  apiBaseUrl: string;

  @Column({ name: 'api_key_encrypted', nullable: true })
  apiKeyEncrypted: string;

  @Column({ name: 'api_secret_encrypted', nullable: true })
  apiSecretEncrypted: string;

  @Column({ name: 'webhook_url', nullable: true })
  webhookUrl: string;

  @Column({ name: 'webhook_secret_encrypted', nullable: true })
  webhookSecretEncrypted: string;

  // Loan Parameters
  @Column({
    name: 'mclr_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 8.5,
  })
  mclrRate: number;

  @Column({
    name: 'max_loan_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 150000,
  })
  maxLoanAmount: number;

  @Column({
    name: 'min_loan_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 5000,
  })
  minLoanAmount: number;

  @Column({ name: 'max_tenure_months', default: 84 })
  maxTenureMonths: number;

  @Column({ name: 'min_tenure_months', default: 36 })
  minTenureMonths: number;

  // Risk Appetite
  @Column({ name: 'min_borrower_score', default: 50 })
  minBorrowerScore: number;

  @Column({ name: 'min_tp_score', default: 50 })
  minTpScore: number;

  // CGFSSD Registration
  @Column({ name: 'cgfssd_registered', default: true })
  cgfssdRegistered: boolean;

  @Column({ name: 'cgfssd_member_id', nullable: true })
  cgfssdMemberId: string;

  // Statistics
  @Column({ name: 'total_loans_disbursed', default: 0 })
  totalLoansDisbursed: number;

  @Column({
    name: 'total_amount_disbursed',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  totalAmountDisbursed: number;

  @Column({
    name: 'total_outstanding',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  totalOutstanding: number;

  @Column({
    name: 'npa_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  npaRate: number;

  // Nodal Officer
  @Column({ name: 'nodal_officer_name', nullable: true })
  nodalOfficerName: string;

  @Column({ name: 'nodal_officer_email', nullable: true })
  nodalOfficerEmail: string;

  @Column({ name: 'nodal_officer_phone', nullable: true })
  nodalOfficerPhone: string;

  // Integration Status
  @Column({ name: 'is_api_integrated', default: false })
  isApiIntegrated: boolean;

  @Column({ name: 'integration_status', nullable: true })
  integrationStatus: string;

  @Column({ name: 'last_api_sync', type: 'timestamptz', nullable: true })
  lastApiSync: Date;

  // PSL (Priority Sector Lending) tracking
  @Column({ name: 'psl_category', default: 'education' })
  pslCategory: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

