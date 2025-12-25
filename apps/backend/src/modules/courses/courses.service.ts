import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Course, CourseStatus, CourseSector, CourseMode } from '../../entities/course.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(TrainingProvider)
    private readonly tpRepository: Repository<TrainingProvider>,
  ) {}

  async findAll(query: {
    sector?: CourseSector;
    mode?: CourseMode;
    status?: CourseStatus;
    search?: string;
    trainingProviderId?: string;
    minFee?: number;
    maxFee?: number;
    page?: number;
    limit?: number;
  }) {
    const {
      sector,
      mode,
      status = CourseStatus.ACTIVE,
      search,
      trainingProviderId,
      minFee,
      maxFee,
      page = 1,
      limit = 20,
    } = query;

    const qb = this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.trainingProvider', 'tp')
      .where('course.status = :status', { status });

    if (sector) {
      qb.andWhere('course.sector = :sector', { sector });
    }

    if (mode) {
      qb.andWhere('course.mode = :mode', { mode });
    }

    if (trainingProviderId) {
      qb.andWhere('course.trainingProviderId = :trainingProviderId', { trainingProviderId });
    }

    if (search) {
      qb.andWhere(
        '(course.name ILIKE :search OR course.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (minFee !== undefined) {
      qb.andWhere('course.totalFee >= :minFee', { minFee });
    }

    if (maxFee !== undefined) {
      qb.andWhere('course.totalFee <= :maxFee', { maxFee });
    }

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit).orderBy('course.createdAt', 'DESC');

    const [courses, total] = await qb.getManyAndCount();

    return {
      data: courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['trainingProvider'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async create(data: Partial<Course>): Promise<Course> {
    const tp = await this.tpRepository.findOne({
      where: { id: data.trainingProviderId },
    });

    if (!tp) {
      throw new NotFoundException('Training provider not found');
    }

    // Calculate total fee
    const totalFee =
      (data.courseFee || 0) +
      (data.registrationFee || 0) +
      (data.examFee || 0) +
      (data.materialFee || 0);

    // Generate course code
    const courseCode = `${tp.registrationNumber.slice(0, 4)}-${Date.now().toString(36).toUpperCase()}`;

    // Default milestones
    const milestones = data.milestones || [
      { id: '0', name: 'T0 - Enrollment', percentage: 0, disbursementPercentage: 30, description: 'Initial enrollment confirmation' },
      { id: '1', name: 'T1 - 33% Completion', percentage: 33, disbursementPercentage: 30, description: '33% of course completed' },
      { id: '2', name: 'T2 - 66% Completion', percentage: 66, disbursementPercentage: 20, description: '66% of course completed' },
      { id: '3', name: 'T3 - Certification', percentage: 100, disbursementPercentage: 20, description: 'Certification achieved' },
    ];

    const course = this.courseRepository.create({
      ...data,
      courseCode,
      totalFee,
      milestones,
      status: CourseStatus.PENDING_APPROVAL,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, data: Partial<Course>): Promise<Course> {
    const course = await this.findById(id);

    // Recalculate total fee if any fee component changes
    if (data.courseFee || data.registrationFee || data.examFee || data.materialFee) {
      data.totalFee =
        (data.courseFee ?? course.courseFee) +
        (data.registrationFee ?? course.registrationFee) +
        (data.examFee ?? course.examFee) +
        (data.materialFee ?? course.materialFee);
    }

    Object.assign(course, data);
    return this.courseRepository.save(course);
  }

  async approve(id: string, approvedBy: string): Promise<Course> {
    const course = await this.findById(id);
    course.status = CourseStatus.ACTIVE;
    course.approvedBy = approvedBy;
    course.approvedAt = new Date();
    return this.courseRepository.save(course);
  }

  async getPopularCourses(limit: number = 10): Promise<Course[]> {
    return this.courseRepository.find({
      where: { status: CourseStatus.ACTIVE },
      order: { totalEnrollments: 'DESC' },
      take: limit,
      relations: ['trainingProvider'],
    });
  }

  async getCourseBySector(sector: CourseSector): Promise<Course[]> {
    return this.courseRepository.find({
      where: { sector, status: CourseStatus.ACTIVE },
      relations: ['trainingProvider'],
    });
  }

  async getSectors(): Promise<{ sector: CourseSector; count: number }[]> {
    const result = await this.courseRepository
      .createQueryBuilder('course')
      .select('course.sector', 'sector')
      .addSelect('COUNT(*)', 'count')
      .where('course.status = :status', { status: CourseStatus.ACTIVE })
      .groupBy('course.sector')
      .getRawMany();

    return result;
  }
}

