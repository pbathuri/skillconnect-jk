import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Notification, NotificationType, NotificationChannel, NotificationPriority } from '../../entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(data: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    priority?: NotificationPriority;
    channels?: NotificationChannel[];
    relatedEntityType?: string;
    relatedEntityId?: string;
    actionUrl?: string;
    metadata?: object;
    titleHi?: string;
    titleUr?: string;
    titleKs?: string;
    messageHi?: string;
    messageUr?: string;
    messageKs?: string;
  }): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...data,
      channels: data.channels || [NotificationChannel.IN_APP],
      priority: data.priority || NotificationPriority.MEDIUM,
    });

    const saved = await this.notificationRepository.save(notification);

    // In production, trigger actual delivery (SMS, email, push)
    await this.deliverNotification(saved);

    return saved;
  }

  async getUserNotifications(userId: string, query: {
    read?: boolean;
    type?: NotificationType;
    page?: number;
    limit?: number;
  }) {
    const { read, type, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (read !== undefined) where.read = read;
    if (type) where.type = type;

    const [data, total] = await this.notificationRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    notification.readAt = new Date();

    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { userId, read: false },
      { read: true, readAt: new Date() },
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepository.count({
      where: { userId, read: false },
    });
  }

  private async deliverNotification(notification: Notification): Promise<void> {
    // Mock delivery - in production, integrate with SMS/Email/Push services
    const deliveryStatus: any = {};

    for (const channel of notification.channels) {
      deliveryStatus[channel] = {
        sent: true,
        sentAt: new Date(),
        delivered: true,
        deliveredAt: new Date(),
      };
    }

    notification.deliveryStatus = deliveryStatus;
    await this.notificationRepository.save(notification);
  }

  // Notification templates for common events
  async notifyLoanSubmitted(userId: string, applicationNumber: string, loanId: string) {
    return this.create({
      userId,
      type: NotificationType.LOAN_SUBMITTED,
      title: 'Loan Application Submitted',
      message: `Your loan application ${applicationNumber} has been submitted successfully.`,
      titleHi: 'ऋण आवेदन जमा किया गया',
      messageHi: `आपका ऋण आवेदन ${applicationNumber} सफलतापूर्वक जमा कर दिया गया है।`,
      titleUr: 'قرض کی درخواست جمع کر دی گئی',
      messageUr: `آپ کی قرض کی درخواست ${applicationNumber} کامیابی سے جمع کر دی گئی ہے۔`,
      relatedEntityType: 'loan',
      relatedEntityId: loanId,
      actionUrl: `/loans/${loanId}`,
    });
  }

  async notifyLoanApproved(userId: string, applicationNumber: string, loanId: string, amount: number) {
    return this.create({
      userId,
      type: NotificationType.LOAN_APPROVED,
      title: 'Loan Approved!',
      message: `Congratulations! Your loan ${applicationNumber} for ₹${amount.toLocaleString()} has been approved.`,
      priority: NotificationPriority.HIGH,
      channels: [NotificationChannel.IN_APP, NotificationChannel.SMS, NotificationChannel.EMAIL],
      relatedEntityType: 'loan',
      relatedEntityId: loanId,
    });
  }

  async notifyEmiReminder(userId: string, loanId: string, emiAmount: number, dueDate: Date) {
    return this.create({
      userId,
      type: NotificationType.EMI_REMINDER,
      title: 'EMI Due Soon',
      message: `Your EMI of ₹${emiAmount.toLocaleString()} is due on ${dueDate.toLocaleDateString()}.`,
      channels: [NotificationChannel.IN_APP, NotificationChannel.SMS],
      relatedEntityType: 'loan',
      relatedEntityId: loanId,
    });
  }

  async notifyMilestoneReached(userId: string, loanId: string, milestoneName: string) {
    return this.create({
      userId,
      type: NotificationType.MILESTONE_REACHED,
      title: 'Milestone Achieved!',
      message: `You have reached ${milestoneName}. Disbursement will be processed soon.`,
      relatedEntityType: 'loan',
      relatedEntityId: loanId,
    });
  }
}

