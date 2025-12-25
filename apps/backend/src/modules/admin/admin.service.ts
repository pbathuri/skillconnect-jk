import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { User, UserRole, UserStatus } from '../../entities/user.entity';
import { Loan, LoanStatus } from '../../entities/loan.entity';
import { Course, CourseStatus } from '../../entities/course.entity';
import { TrainingProvider, TPStatus } from '../../entities/training-provider.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(TrainingProvider)
    private readonly tpRepository: Repository<TrainingProvider>,
  ) {}

  async getDashboardStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // User stats
    const totalUsers = await this.userRepository.count();
    const totalLearners = await this.userRepository.count({
      where: { role: UserRole.LEARNER },
    });
    const newUsersThisMonth = await this.userRepository.count({
      where: { createdAt: Between(thirtyDaysAgo, now) },
    });

    // Loan stats
    const totalLoans = await this.loanRepository.count();
    const activeLoans = await this.loanRepository.count({
      where: { status: LoanStatus.ACTIVE },
    });
    const totalDisbursed = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.disbursedAmount)', 'total')
      .getRawOne();
    const npaLoans = await this.loanRepository.count({
      where: { status: LoanStatus.NPA },
    });

    // Course stats
    const totalCourses = await this.courseRepository.count();
    const activeCourses = await this.courseRepository.count({
      where: { status: CourseStatus.ACTIVE },
    });

    // Training Provider stats
    const totalTPs = await this.tpRepository.count();
    const approvedTPs = await this.tpRepository.count({
      where: { status: TPStatus.APPROVED },
    });

    // Calculate KPIs (as per PRD)
    const certificationRate = 62; // Placeholder - calculate from actual data
    const placementRate = 50; // Placeholder
    const npaRate = totalLoans > 0 ? (npaLoans / totalLoans) * 100 : 0;

    return {
      users: {
        total: totalUsers,
        learners: totalLearners,
        newThisMonth: newUsersThisMonth,
      },
      loans: {
        total: totalLoans,
        active: activeLoans,
        totalDisbursed: totalDisbursed?.total || 0,
        npaCount: npaLoans,
        npaRate: Math.round(npaRate * 100) / 100,
      },
      courses: {
        total: totalCourses,
        active: activeCourses,
      },
      trainingProviders: {
        total: totalTPs,
        approved: approvedTPs,
      },
      kpis: {
        certificationRate,
        placementRate,
        npaRate: Math.round(npaRate * 100) / 100,
        targetCertificationRate: 75, // Target from PRD
        targetPlacementRate: 50,
        targetNpaRate: 5,
      },
    };
  }

  async getPendingApprovals() {
    const pendingCourses = await this.courseRepository.count({
      where: { status: CourseStatus.PENDING_APPROVAL },
    });
    const pendingTPs = await this.tpRepository.count({
      where: { status: TPStatus.PENDING_APPROVAL },
    });
    const pendingLoans = await this.loanRepository.count({
      where: { status: LoanStatus.UNDER_REVIEW },
    });

    return {
      courses: pendingCourses,
      trainingProviders: pendingTPs,
      loans: pendingLoans,
      total: pendingCourses + pendingTPs + pendingLoans,
    };
  }

  async getRecentActivity(limit: number = 20) {
    const recentLoans = await this.loanRepository.find({
      relations: ['learner', 'course'],
      order: { createdAt: 'DESC' },
      take: limit,
    });

    return recentLoans.map((loan) => ({
      type: 'loan',
      id: loan.id,
      applicationNumber: loan.applicationNumber,
      status: loan.status,
      learner: loan.learner?.fullName,
      course: loan.course?.name,
      amount: loan.requestedAmount,
      createdAt: loan.createdAt,
    }));
  }

  async generateReport(type: string, startDate: Date, endDate: Date) {
    // Generate various reports based on type
    switch (type) {
      case 'loan_disbursement':
        return this.getLoanDisbursementReport(startDate, endDate);
      case 'tp_performance':
        return this.getTPPerformanceReport();
      case 'sector_analysis':
        return this.getSectorAnalysisReport();
      default:
        return this.getDashboardStats();
    }
  }

  private async getLoanDisbursementReport(startDate: Date, endDate: Date) {
    const loans = await this.loanRepository.find({
      where: { createdAt: Between(startDate, endDate) },
      relations: ['course', 'trainingProvider'],
    });

    return {
      period: { startDate, endDate },
      totalApplications: loans.length,
      totalDisbursed: loans.reduce((sum, l) => sum + (l.disbursedAmount || 0), 0),
      byStatus: loans.reduce((acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  private async getTPPerformanceReport() {
    const tps = await this.tpRepository.find({
      where: { status: TPStatus.APPROVED },
    });

    return tps.map((tp) => ({
      id: tp.id,
      name: tp.name,
      tpScore: tp.tpScore,
      completionRate: tp.completionRate,
      certificationRate: tp.certificationRate,
      placementRate: tp.placementRate,
      totalEnrolled: tp.totalLearnersEnrolled,
      guaranteeClaims: tp.totalGuaranteeClaims,
    }));
  }

  private async getSectorAnalysisReport() {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .select('course.sector', 'sector')
      .addSelect('COUNT(*)', 'courseCount')
      .addSelect('SUM(course.totalEnrollments)', 'totalEnrollments')
      .groupBy('course.sector')
      .getRawMany();

    return courses;
  }
}

