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

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
  HOLIDAY = 'holiday',
}

/**
 * Attendance Entity
 * 
 * Tracks learner attendance for milestone verification.
 * Attendance percentage affects course completion and disbursement eligibility.
 */
@Entity('attendance')
@Index(['loanId', 'date'], { unique: true })
@Index(['date'])
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'loan_id' })
  loanId: string;

  @ManyToOne(() => Loan)
  @JoinColumn({ name: 'loan_id' })
  loan: Loan;

  @Column({ name: 'learner_id' })
  learnerId: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column({ name: 'training_provider_id' })
  trainingProviderId: string;

  @Column({ name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.ABSENT,
  })
  status: AttendanceStatus;

  // Time tracking
  @Column({ name: 'check_in_time', type: 'time', nullable: true })
  checkInTime: string;

  @Column({ name: 'check_out_time', type: 'time', nullable: true })
  checkOutTime: string;

  @Column({ name: 'hours_attended', type: 'decimal', precision: 4, scale: 2, nullable: true })
  hoursAttended: number;

  // Module/Session tracking
  @Column({ name: 'module_id', nullable: true })
  moduleId: string;

  @Column({ name: 'session_name', nullable: true })
  sessionName: string;

  // Verification
  @Column({ name: 'verification_method', nullable: true })
  verificationMethod: string; // biometric, manual, selfie

  @Column({ name: 'verification_data', type: 'jsonb', nullable: true })
  verificationData: object;

  @Column({ name: 'recorded_by', nullable: true })
  recordedBy: string;

  @Column({ name: 'remarks', nullable: true })
  remarks: string;

  // For offline sync
  @Column({ name: 'synced_at', type: 'timestamptz', nullable: true })
  syncedAt: Date;

  @Column({ name: 'offline_record', default: false })
  offlineRecord: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

