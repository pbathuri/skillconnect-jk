import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum EducationLevel {
  BELOW_10TH = 'below_10th',
  TENTH = '10th',
  TWELFTH = '12th',
  DIPLOMA = 'diploma',
  GRADUATE = 'graduate',
  POST_GRADUATE = 'post_graduate',
}

export enum IncomeRange {
  BELOW_1L = 'below_1l',
  L1_TO_3L = '1l_to_3l',
  L3_TO_5L = '3l_to_5l',
  ABOVE_5L = 'above_5l',
  NOT_DISCLOSED = 'not_disclosed',
}

/**
 * Learner Profile Entity
 * 
 * Extended profile information for learners used in Borrower Score calculation.
 * Based on the Risk & Credit Policy appendix scoring components.
 */
@Entity('learner_profiles')
export class LearnerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.learnerProfile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Education & Skills Baseline (20% of Borrower Score)
  @Column({
    name: 'education_level',
    type: 'enum',
    enum: EducationLevel,
    nullable: true,
  })
  educationLevel: EducationLevel;

  @Column({ name: 'school_name', nullable: true })
  schoolName: string;

  @Column({ name: 'highest_qualification_year', nullable: true })
  highestQualificationYear: number;

  @Column({
    name: 'baseline_assessment_score',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  baselineAssessmentScore: number;

  @Column({ name: 'prior_certifications', type: 'jsonb', default: '[]' })
  priorCertifications: string[];

  // Income & Financial Information (15% of Borrower Score)
  @Column({
    name: 'income_range',
    type: 'enum',
    enum: IncomeRange,
    default: IncomeRange.NOT_DISCLOSED,
  })
  incomeRange: IncomeRange;

  @Column({ name: 'family_income_range', nullable: true })
  familyIncomeRange: string;

  @Column({ name: 'has_bank_account', default: false })
  hasBankAccount: boolean;

  @Column({ name: 'has_previous_loans', default: false })
  hasPreviousLoans: boolean;

  @Column({
    name: 'credit_bureau_score',
    type: 'integer',
    nullable: true,
  })
  creditBureauScore: number;

  @Column({ name: 'existing_loan_amount', type: 'decimal', precision: 12, scale: 2, nullable: true })
  existingLoanAmount: number;

  // Course Fit & Demand (25% of Borrower Score)
  @Column({ name: 'career_goals', type: 'text', nullable: true })
  careerGoals: string;

  @Column({ name: 'preferred_sectors', type: 'jsonb', default: '[]' })
  preferredSectors: string[];

  @Column({ name: 'preferred_locations', type: 'jsonb', default: '[]' })
  preferredLocations: string[];

  @Column({ name: 'willing_to_relocate', default: false })
  willingToRelocate: boolean;

  // Commitment Indicators (20% of Borrower Score)
  @Column({ name: 'documents_submitted_at', type: 'timestamptz', nullable: true })
  documentsSubmittedAt: Date;

  @Column({ name: 'enrollment_completion_time_hours', nullable: true })
  enrollmentCompletionTimeHours: number;

  @Column({ name: 'orientation_completed', default: false })
  orientationCompleted: boolean;

  @Column({ name: 'orientation_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  orientationScore: number;

  @Column({ name: 'engagement_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  engagementScore: number;

  // Community Endorsement (10% of Borrower Score)
  @Column({ name: 'endorsements', type: 'jsonb', default: '[]' })
  endorsements: {
    endorserName: string;
    endorserType: 'community_leader' | 'employer' | 'ngo' | 'teacher';
    endorserContact: string;
    verified: boolean;
    verifiedAt?: Date;
  }[];

  // Employment Information
  @Column({ name: 'is_employed', default: false })
  isEmployed: boolean;

  @Column({ name: 'current_employer', nullable: true })
  currentEmployer: string;

  @Column({ name: 'employment_type', nullable: true })
  employmentType: string;

  @Column({ name: 'years_of_experience', type: 'decimal', precision: 4, scale: 1, nullable: true })
  yearsOfExperience: number;

  // Guardian/Co-signer Information
  @Column({ name: 'guardian_name', nullable: true })
  guardianName: string;

  @Column({ name: 'guardian_phone', nullable: true })
  guardianPhone: string;

  @Column({ name: 'guardian_relation', nullable: true })
  guardianRelation: string;

  @Column({ name: 'guardian_income_range', nullable: true })
  guardianIncomeRange: string;

  // Calculated Borrower Score
  @Column({
    name: 'borrower_score',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  borrowerScore: number;

  @Column({ name: 'borrower_score_components', type: 'jsonb', nullable: true })
  borrowerScoreComponents: {
    kycScore: number;
    educationScore: number;
    incomeScore: number;
    courseFitScore: number;
    commitmentScore: number;
    communityScore: number;
  };

  @Column({ name: 'borrower_score_updated_at', type: 'timestamptz', nullable: true })
  borrowerScoreUpdatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

