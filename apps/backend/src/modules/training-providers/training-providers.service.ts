import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingProvider, TPStatus } from '../../entities/training-provider.entity';
import { Course } from '../../entities/course.entity';
import { Attendance, AttendanceStatus } from '../../entities/attendance.entity';
import { Assessment, AssessmentStatus, AssessmentType } from '../../entities/assessment.entity';
import { RiskScoringService } from '../risk-scoring/risk-scoring.service';

@Injectable()
export class TrainingProvidersService {
  constructor(
    @InjectRepository(TrainingProvider)
    private readonly tpRepository: Repository<TrainingProvider>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    private readonly riskScoringService: RiskScoringService,
  ) {}

  async findAll(query: {
    status?: TPStatus;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { status, search, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const qb = this.tpRepository.createQueryBuilder('tp');

    if (status) {
      qb.where('tp.status = :status', { status });
    }

    if (search) {
      qb.andWhere('(tp.name ILIKE :search OR tp.legalName ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    qb.skip(skip).take(limit).orderBy('tp.createdAt', 'DESC');

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<TrainingProvider> {
    const tp = await this.tpRepository.findOne({
      where: { id },
      relations: ['courses'],
    });

    if (!tp) {
      throw new NotFoundException('Training provider not found');
    }

    return tp;
  }

  async create(data: Partial<TrainingProvider>): Promise<TrainingProvider> {
    const tp = this.tpRepository.create({
      ...data,
      status: TPStatus.PENDING_APPROVAL,
    });
    return this.tpRepository.save(tp);
  }

  async update(id: string, data: Partial<TrainingProvider>): Promise<TrainingProvider> {
    const tp = await this.findById(id);
    Object.assign(tp, data);
    return this.tpRepository.save(tp);
  }

  async approve(id: string): Promise<TrainingProvider> {
    const tp = await this.findById(id);
    tp.status = TPStatus.APPROVED;
    return this.tpRepository.save(tp);
  }

  async uploadAttendance(
    tpId: string,
    data: {
      loanId: string;
      learnerId: string;
      courseId: string;
      records: Array<{
        date: string;
        status: AttendanceStatus;
        checkInTime?: string;
        checkOutTime?: string;
        hoursAttended?: number;
      }>;
    },
  ): Promise<Attendance[]> {
    const tp = await this.findById(tpId);

    const attendances = data.records.map((record) =>
      this.attendanceRepository.create({
        loanId: data.loanId,
        learnerId: data.learnerId,
        courseId: data.courseId,
        trainingProviderId: tpId,
        ...record,
        date: new Date(record.date),
      }),
    );

    return this.attendanceRepository.save(attendances);
  }

  async uploadAssessment(
    tpId: string,
    data: {
      loanId: string;
      learnerId: string;
      courseId: string;
      type: AssessmentType;
      name: string;
      scheduledDate: string;
      obtainedScore?: number;
      maxScore?: number;
      status?: AssessmentStatus;
      certificateNumber?: string;
      certificateUrl?: string;
    },
  ): Promise<Assessment> {
    const tp = await this.findById(tpId);

    const assessment = this.assessmentRepository.create({
      trainingProviderId: tpId,
      ...data,
      scheduledDate: new Date(data.scheduledDate),
      percentage: data.obtainedScore && data.maxScore
        ? (data.obtainedScore / data.maxScore) * 100
        : undefined,
    });

    return this.assessmentRepository.save(assessment);
  }

  async getTPScore(id: string) {
    return this.riskScoringService.calculateTPScore(id);
  }

  async updateGuaranteeDeposit(
    id: string,
    amount: number,
  ): Promise<TrainingProvider> {
    const tp = await this.findById(id);
    tp.guaranteeDepositAmount = amount;
    tp.availableGuaranteeBalance = amount;
    return this.tpRepository.save(tp);
  }

  async getDashboard(tpId: string) {
    const tp = await this.findById(tpId);
    
    const totalCourses = await this.courseRepository.count({
      where: { trainingProviderId: tpId },
    });

    const tpScore = await this.getTPScore(tpId);

    return {
      trainingProvider: tp,
      tpScore,
      stats: {
        totalCourses,
        totalEnrolled: tp.totalLearnersEnrolled,
        totalCertified: tp.totalLearnersCertified,
        totalPlaced: tp.totalLearnersPlaced,
        completionRate: tp.completionRate,
        certificationRate: tp.certificationRate,
        placementRate: tp.placementRate,
        guaranteeBalance: tp.availableGuaranteeBalance,
      },
    };
  }
}

