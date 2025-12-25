import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum NotificationType {
  // Loan related
  LOAN_SUBMITTED = 'loan_submitted',
  LOAN_APPROVED = 'loan_approved',
  LOAN_REJECTED = 'loan_rejected',
  DOCUMENTS_PENDING = 'documents_pending',
  KYC_VERIFIED = 'kyc_verified',

  // Disbursement related
  MILESTONE_REACHED = 'milestone_reached',
  DISBURSEMENT_INITIATED = 'disbursement_initiated',
  DISBURSEMENT_COMPLETED = 'disbursement_completed',

  // Repayment related
  EMI_REMINDER = 'emi_reminder',
  EMI_DUE_TODAY = 'emi_due_today',
  EMI_OVERDUE = 'emi_overdue',
  EMI_RECEIVED = 'emi_received',
  AUTOPAY_FAILED = 'autopay_failed',

  // Course related
  COURSE_STARTED = 'course_started',
  ATTENDANCE_LOW = 'attendance_low',
  ASSESSMENT_SCHEDULED = 'assessment_scheduled',
  ASSESSMENT_RESULT = 'assessment_result',
  CERTIFICATION_ACHIEVED = 'certification_achieved',

  // Training Provider
  TP_MILESTONE_VERIFICATION = 'tp_milestone_verification',
  TP_PAYMENT_RECEIVED = 'tp_payment_received',
  TP_GUARANTEE_CLAIM = 'tp_guarantee_claim',

  // System
  SYSTEM_ALERT = 'system_alert',
  POLICY_UPDATE = 'policy_update',
  ACCOUNT_UPDATE = 'account_update',
}

export enum NotificationChannel {
  IN_APP = 'in_app',
  SMS = 'sms',
  EMAIL = 'email',
  PUSH = 'push',
  WHATSAPP = 'whatsapp',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Notification Entity
 * 
 * Multi-channel notification system supporting in-app, SMS, email, and push notifications.
 * Supports multilingual content for J&K users.
 */
@Entity('notifications')
@Index(['userId'])
@Index(['type'])
@Index(['read'])
@Index(['createdAt'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM,
  })
  priority: NotificationPriority;

  // Content
  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  // Multilingual content
  @Column({ name: 'title_hi', nullable: true })
  titleHi: string;

  @Column({ name: 'title_ur', nullable: true })
  titleUr: string;

  @Column({ name: 'title_ks', nullable: true })
  titleKs: string;

  @Column({ name: 'message_hi', type: 'text', nullable: true })
  messageHi: string;

  @Column({ name: 'message_ur', type: 'text', nullable: true })
  messageUr: string;

  @Column({ name: 'message_ks', type: 'text', nullable: true })
  messageKs: string;

  // Delivery channels
  @Column({
    type: 'enum',
    enum: NotificationChannel,
    array: true,
    default: [NotificationChannel.IN_APP],
  })
  channels: NotificationChannel[];

  // Status
  @Column({ default: false })
  read: boolean;

  @Column({ name: 'read_at', type: 'timestamptz', nullable: true })
  readAt: Date;

  // Channel delivery status
  @Column({ name: 'delivery_status', type: 'jsonb', default: '{}' })
  deliveryStatus: {
    [key in NotificationChannel]?: {
      sent: boolean;
      sentAt?: Date;
      delivered?: boolean;
      deliveredAt?: Date;
      error?: string;
    };
  };

  // Related entity
  @Column({ name: 'related_entity_type', nullable: true })
  relatedEntityType: string;

  @Column({ name: 'related_entity_id', nullable: true })
  relatedEntityId: string;

  // Action URL
  @Column({ name: 'action_url', nullable: true })
  actionUrl: string;

  // Metadata
  @Column({ type: 'jsonb', nullable: true })
  metadata: object;

  // Scheduling
  @Column({ name: 'scheduled_for', type: 'timestamptz', nullable: true })
  scheduledFor: Date;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

