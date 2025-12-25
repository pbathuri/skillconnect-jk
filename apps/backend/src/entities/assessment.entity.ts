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

export enum AssessmentType {
  BASELINE = 'baseline', // Entry test
  MODULE = 'module', // Per module assessment
  MIDTERM = 'midterm',
  FINAL = 'final',
  CERTIFICATION = 'certification',
  PRACTICAL = 'practical',
}

export enum AssessmentStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PASSED = 'passed',
  FAILED = 'failed',
  ABSENT = 'absent',
  RESCHEDULED = 'rescheduled',
}

/**
 * Assessment Entity
 * 
 * Tracks learner assessments for certification and milestone verification.
 * Assessment scores contribute to course completion percentage.
 */
@Entity('assessments')
@Index(['loanId'])
@Index(['type'])
export class Assessment {
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

  @Column({
    type: 'enum',
    enum: AssessmentType,
  })
  type: AssessmentType;

  @Column({
    type: 'enum',
    enum: AssessmentStatus,
    default: AssessmentStatus.SCHEDULED,
  })
  status: AssessmentStatus;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Module association
  @Column({ name: 'module_id', nullable: true })
  moduleId: string;

  @Column({ name: 'module_name', nullable: true })
  moduleName: string;

  // Scheduling
  @Column({ name: 'scheduled_date', type: 'date' })
  scheduledDate: Date;

  @Column({ name: 'scheduled_time', type: 'time', nullable: true })
  scheduledTime: string;

  @Column({ name: 'duration_minutes', nullable: true })
  durationMinutes: number;

  @Column({ name: 'actual_date', type: 'date', nullable: true })
  actualDate: Date;

  // Scoring
  @Column({ name: 'max_score', type: 'decimal', precision: 6, scale: 2, default: 100 })
  maxScore: number;

  @Column({ name: 'passing_score', type: 'decimal', precision: 6, scale: 2, default: 40 })
  passingScore: number;

  @Column({
    name: 'obtained_score',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  obtainedScore: number;

  @Column({
    name: 'percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  percentage: number;

  @Column({ name: 'grade', nullable: true })
  grade: string;

  // Certification specific
  @Column({ name: 'certification_body', nullable: true })
  certificationBody: string;

  @Column({ name: 'certificate_number', nullable: true })
  certificateNumber: string;

  @Column({ name: 'certificate_url', nullable: true })
  certificateUrl: string;

  @Column({ name: 'certificate_issued_date', type: 'date', nullable: true })
  certificateIssuedDate: Date;

  // Attempt tracking
  @Column({ name: 'attempt_number', default: 1 })
  attemptNumber: number;

  @Column({ name: 'max_attempts', default: 3 })
  maxAttempts: number;

  // Evaluation
  @Column({ name: 'evaluated_by', nullable: true })
  evaluatedBy: string;

  @Column({ name: 'evaluated_at', type: 'timestamptz', nullable: true })
  evaluatedAt: Date;

  @Column({ name: 'evaluator_remarks', type: 'text', nullable: true })
  evaluatorRemarks: string;

  // Evidence
  @Column({ name: 'answer_sheet_url', nullable: true })
  answerSheetUrl: string;

  @Column({ name: 'practical_evidence_urls', type: 'jsonb', default: '[]' })
  practicalEvidenceUrls: string[];

  // Weightage for course completion
  @Column({ name: 'weightage', type: 'decimal', precision: 5, scale: 2, default: 1 })
  weightage: number;

  @Column({ name: 'remarks', type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

