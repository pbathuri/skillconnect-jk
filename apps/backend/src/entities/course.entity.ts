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
import { TrainingProvider } from './training-provider.entity';
import { Loan } from './loan.entity';

export enum CourseStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum CourseMode {
  OFFLINE = 'offline',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}

export enum CourseSector {
  IT_ITES = 'it_ites',
  ELECTRONICS = 'electronics',
  TOURISM_HOSPITALITY = 'tourism_hospitality',
  HEALTHCARE = 'healthcare',
  RETAIL = 'retail',
  MANUFACTURING = 'manufacturing',
  AGRICULTURE = 'agriculture',
  HANDICRAFTS = 'handicrafts',
  BEAUTY_WELLNESS = 'beauty_wellness',
  APPAREL = 'apparel',
  OTHER = 'other',
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

/**
 * Course Entity
 * 
 * Represents skill development courses offered by training providers.
 * Includes curriculum structure for milestone tracking.
 */
@Entity('courses')
@Index(['sector'])
@Index(['status'])
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'course_code', length: 50, unique: true })
  courseCode: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'short_description', length: 500, nullable: true })
  shortDescription: string;

  @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status: CourseStatus;

  @Column({
    type: 'enum',
    enum: CourseSector,
  })
  sector: CourseSector;

  @Column({
    type: 'enum',
    enum: CourseMode,
    default: CourseMode.OFFLINE,
  })
  mode: CourseMode;

  @Column({
    name: 'skill_level',
    type: 'enum',
    enum: SkillLevel,
    default: SkillLevel.BEGINNER,
  })
  skillLevel: SkillLevel;

  // Duration
  @Column({ name: 'duration_weeks' })
  durationWeeks: number;

  @Column({ name: 'hours_per_week', default: 40 })
  hoursPerWeek: number;

  @Column({ name: 'total_hours' })
  totalHours: number;

  // Pricing
  @Column({
    name: 'course_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  courseFee: number;

  @Column({
    name: 'registration_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  registrationFee: number;

  @Column({
    name: 'exam_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  examFee: number;

  @Column({
    name: 'material_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  materialFee: number;

  // Calculated total cost
  @Column({
    name: 'total_fee',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalFee: number;

  // Eligibility
  @Column({ name: 'min_age', default: 18 })
  minAge: number;

  @Column({ name: 'max_age', default: 35 })
  maxAge: number;

  @Column({ name: 'min_education', nullable: true })
  minEducation: string;

  @Column({ name: 'prerequisites', type: 'jsonb', default: '[]' })
  prerequisites: string[];

  // Certification
  @Column({ name: 'certification_body', nullable: true })
  certificationBody: string;

  @Column({ name: 'certification_name', nullable: true })
  certificationName: string;

  @Column({ name: 'is_ncvet_aligned', default: false })
  isNcvetAligned: boolean;

  @Column({ name: 'nsqf_level', nullable: true })
  nsqfLevel: number;

  // Job Demand (affects Borrower Score - Course Fit)
  @Column({
    name: 'job_demand_index',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 50,
  })
  jobDemandIndex: number;

  @Column({ name: 'average_placement_salary', type: 'decimal', precision: 10, scale: 2, nullable: true })
  averagePlacementSalary: number;

  @Column({ name: 'placement_rate', type: 'decimal', precision: 5, scale: 2, nullable: true })
  placementRate: number;

  // Curriculum Structure (for milestone tracking)
  @Column({ type: 'jsonb', default: '[]' })
  curriculum: {
    moduleId: string;
    moduleName: string;
    description: string;
    durationHours: number;
    sequenceOrder: number;
    milestonePercentage: number; // Cumulative percentage at end of module
  }[];

  // Milestones definition
  @Column({ name: 'milestones', type: 'jsonb', default: '[]' })
  milestones: {
    id: string;
    name: string;
    percentage: number; // Course completion percentage trigger
    disbursementPercentage: number; // Loan disbursement percentage
    description: string;
  }[];

  // Batch Configuration
  @Column({ name: 'batch_size', default: 30 })
  batchSize: number;

  @Column({ name: 'min_batch_size', default: 10 })
  minBatchSize: number;

  // Content
  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'syllabus_url', nullable: true })
  syllabusUrl: string;

  @Column({ name: 'brochure_url', nullable: true })
  brochureUrl: string;

  // Multilingual content
  @Column({ name: 'name_hi', nullable: true })
  nameHi: string;

  @Column({ name: 'name_ur', nullable: true })
  nameUr: string;

  @Column({ name: 'name_ks', nullable: true })
  nameKs: string;

  @Column({ name: 'description_hi', type: 'text', nullable: true })
  descriptionHi: string;

  @Column({ name: 'description_ur', type: 'text', nullable: true })
  descriptionUr: string;

  @Column({ name: 'description_ks', type: 'text', nullable: true })
  descriptionKs: string;

  // Statistics
  @Column({ name: 'total_enrollments', default: 0 })
  totalEnrollments: number;

  @Column({ name: 'total_completions', default: 0 })
  totalCompletions: number;

  @Column({
    name: 'average_rating',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  averageRating: number;

  @Column({ name: 'total_reviews', default: 0 })
  totalReviews: number;

  // Relations
  @Column({ name: 'training_provider_id' })
  trainingProviderId: string;

  @ManyToOne(() => TrainingProvider, (tp) => tp.courses)
  @JoinColumn({ name: 'training_provider_id' })
  trainingProvider: TrainingProvider;

  @OneToMany(() => Loan, (loan) => loan.course)
  loans: Loan[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Approval tracking
  @Column({ name: 'approved_by', nullable: true })
  approvedBy: string;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt: Date;
}

