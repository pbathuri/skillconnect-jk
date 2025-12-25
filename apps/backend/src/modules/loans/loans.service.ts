import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Loan, LoanStatus, LoanPurpose } from '../../entities/loan.entity';
import { Disbursement, DisbursementStatus, DisbursementType } from '../../entities/disbursement.entity';
import { Repayment, RepaymentStatus, PaymentMethod } from '../../entities/repayment.entity';
import { User } from '../../entities/user.entity';
import { Course } from '../../entities/course.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';
import { Bank } from '../../entities/bank.entity';
import { RiskScoringService } from '../risk-scoring/risk-scoring.service';

interface CreateLoanDto {
  learnerId: string;
  courseId: string;
  requestedAmount: number;
  purpose?: LoanPurpose;
  deviceAmount?: number;
  tenureMonths?: number;
}

/**
 * Loans Service
 * 
 * Implements the complete loan lifecycle:
 * 1. Application submission
 * 2. Risk assessment (Borrower Score + TPScore)
 * 3. Bank submission and approval
 * 4. Milestone-based disbursement (T0: 30%, T1: 30%, T2: 20%, T3: 20%)
 * 5. Repayment with step-up EMI structure
 * 6. Delinquency management
 */
@Injectable()
export class LoansService {
  // Milestone definitions (as per PRD)
  private readonly milestones = [
    { id: 0, name: 'T0 - Enrollment', percentage: 0, disbursementPercentage: 30 },
    { id: 1, name: 'T1 - 33% Completion', percentage: 33, disbursementPercentage: 30 },
    { id: 2, name: 'T2 - 66% Completion', percentage: 66, disbursementPercentage: 20 },
    { id: 3, name: 'T3 - Certification', percentage: 100, disbursementPercentage: 20 },
  ];

  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Disbursement)
    private readonly disbursementRepository: Repository<Disbursement>,
    @InjectRepository(Repayment)
    private readonly repaymentRepository: Repository<Repayment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(TrainingProvider)
    private readonly tpRepository: Repository<TrainingProvider>,
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
    private readonly riskScoringService: RiskScoringService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Submit a new loan application
   */
  async createApplication(dto: CreateLoanDto): Promise<Loan> {
    const { learnerId, courseId, requestedAmount, purpose, deviceAmount, tenureMonths } = dto;

    // Validate learner
    const learner = await this.userRepository.findOne({ where: { id: learnerId } });
    if (!learner) {
      throw new NotFoundException('Learner not found');
    }

    // Validate course
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['trainingProvider'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Validate amount limits
    const minAmount = this.configService.get<number>('loan.minAmount') || 5000;
    const maxAmount = this.configService.get<number>('loan.maxAmount') || 150000;
    
    if (requestedAmount < minAmount || requestedAmount > maxAmount) {
      throw new BadRequestException(`Loan amount must be between ₹${minAmount} and ₹${maxAmount}`);
    }

    // Check for existing active loan for same course
    const existingLoan = await this.loanRepository.findOne({
      where: {
        learnerId,
        courseId,
        status: In([
          LoanStatus.SUBMITTED,
          LoanStatus.UNDER_REVIEW,
          LoanStatus.BANK_SUBMITTED,
          LoanStatus.ACTIVE,
        ]),
      },
    });

    if (existingLoan) {
      throw new BadRequestException('An active loan application already exists for this course');
    }

    // Calculate risk scores
    const borrowerScore = await this.riskScoringService.calculateBorrowerScore(learnerId, courseId);
    const tpScore = await this.riskScoringService.calculateTPScore(course.trainingProviderId);

    if (!borrowerScore.eligibleForLoan) {
      throw new BadRequestException(
        `Borrower Score (${borrowerScore.score}) is below minimum threshold. ${borrowerScore.recommendations.join('. ')}`,
      );
    }

    // Calculate interest rate
    const interestRates = this.riskScoringService.calculateInterestRate(borrowerScore.score);

    // Get default bank (for pilot, single bank)
    const bank = await this.bankRepository.findOne({ where: { status: 'active' } });

    // Calculate EMI
    const finalTenure = tenureMonths || 60; // Default 5 years
    const emiDetails = this.riskScoringService.calculateEMI(
      requestedAmount,
      interestRates.totalRate,
      finalTenure,
    );

    // Calculate TP guarantee amount
    const tpGuarantee = await this.riskScoringService.calculateDynamicGuarantee(
      course.trainingProviderId,
      requestedAmount,
    );

    // Generate application number
    const applicationNumber = `SCJK${Date.now().toString(36).toUpperCase()}`;

    // Initialize milestone progress
    const milestoneProgress = this.milestones.map((m) => ({
      milestone: m.id,
      name: m.name,
      targetPercentage: m.percentage,
      actualPercentage: 0,
      disbursementPercentage: m.disbursementPercentage,
      status: 'pending' as const,
    }));

    // Create loan
    const loan = this.loanRepository.create({
      applicationNumber,
      learnerId,
      courseId,
      trainingProviderId: course.trainingProviderId,
      bankId: bank?.id,
      requestedAmount,
      purpose: purpose || LoanPurpose.COURSE_FEE,
      deviceAmount: deviceAmount || 0,
      tenureMonths: finalTenure,
      borrowerScoreAtApplication: borrowerScore.score,
      tpScoreAtApplication: tpScore.score,
      riskCategory: borrowerScore.riskCategory,
      interestRate: interestRates.totalRate,
      mclrRate: interestRates.mclrRate,
      spreadRate: interestRates.spreadRate,
      emiAmount: emiDetails.standardEmi,
      stepUpEmiAmount: emiDetails.stepUpEmi,
      totalEmis: finalTenure,
      tpGuaranteeAmount: tpGuarantee.guaranteeAmount,
      cgfssdCoveragePercentage: this.configService.get<number>('cgfssd.coveragePercentage') || 75,
      milestoneProgress,
      status: LoanStatus.DRAFT,
      applicationDate: new Date(),
    });

    return this.loanRepository.save(loan);
  }

  /**
   * Submit loan application for review
   */
  async submitApplication(loanId: string, userId: string): Promise<Loan> {
    const loan = await this.findById(loanId);

    if (loan.status !== LoanStatus.DRAFT) {
      throw new BadRequestException('Only draft applications can be submitted');
    }

    loan.status = LoanStatus.SUBMITTED;
    loan.submittedBy = userId;

    return this.loanRepository.save(loan);
  }

  /**
   * Bank approves/rejects loan
   */
  async bankDecision(
    loanId: string,
    decision: 'approve' | 'reject',
    approvedBy: string,
    data?: { approvedAmount?: number; rejectionReason?: string },
  ): Promise<Loan> {
    const loan = await this.findById(loanId);

    if (loan.status !== LoanStatus.BANK_SUBMITTED && loan.status !== LoanStatus.UNDER_REVIEW) {
      throw new BadRequestException('Loan is not pending bank decision');
    }

    if (decision === 'approve') {
      loan.status = LoanStatus.BANK_APPROVED;
      loan.approvedAmount = data?.approvedAmount || loan.requestedAmount;
      loan.approvedBy = approvedBy;
      loan.approvalDate = new Date();

      // Calculate moratorium end date (course duration + 3 months)
      const course = await this.courseRepository.findOne({ where: { id: loan.courseId } });
      if (course) {
        const courseEndDate = new Date();
        courseEndDate.setDate(courseEndDate.getDate() + course.durationWeeks * 7);
        loan.courseEndDate = courseEndDate;

        const moratoriumEnd = new Date(courseEndDate);
        moratoriumEnd.setMonth(moratoriumEnd.getMonth() + (loan.moratoriumMonths || 3));
        loan.moratoriumEndDate = moratoriumEnd;

        // First EMI date
        const firstEmiDate = new Date(moratoriumEnd);
        firstEmiDate.setMonth(firstEmiDate.getMonth() + 1);
        loan.firstEmiDate = firstEmiDate;
      }
    } else {
      loan.status = LoanStatus.BANK_REJECTED;
      loan.rejectionReason = data?.rejectionReason || 'Application rejected by bank';
    }

    return this.loanRepository.save(loan);
  }

  /**
   * Activate loan and trigger first disbursement (T0)
   */
  async activateLoan(loanId: string): Promise<Loan> {
    const loan = await this.findById(loanId);

    if (loan.status !== LoanStatus.BANK_APPROVED) {
      throw new BadRequestException('Only bank-approved loans can be activated');
    }

    loan.status = LoanStatus.ACTIVE;
    loan.courseStartDate = new Date();
    await this.loanRepository.save(loan);

    // Trigger T0 disbursement (enrollment)
    await this.createDisbursement(loanId, 0);

    return this.findById(loanId);
  }

  /**
   * Verify milestone completion and trigger disbursement
   */
  async verifyMilestone(
    loanId: string,
    milestoneNumber: number,
    verifiedBy: string,
    data: {
      courseCompletionPercentage: number;
      attendancePercentage: number;
      assessmentScore?: number;
    },
  ): Promise<Loan> {
    const loan = await this.findById(loanId);

    if (loan.status !== LoanStatus.ACTIVE && loan.status !== LoanStatus.DISBURSEMENT_IN_PROGRESS) {
      throw new BadRequestException('Loan must be active for milestone verification');
    }

    const milestone = this.milestones.find((m) => m.id === milestoneNumber);
    if (!milestone) {
      throw new BadRequestException('Invalid milestone number');
    }

    // Check if previous milestones are completed
    if (milestoneNumber > 0) {
      const previousMilestone = loan.milestoneProgress.find(
        (m) => m.milestone === milestoneNumber - 1,
      );
      if (!previousMilestone || previousMilestone.status !== 'disbursed') {
        throw new BadRequestException('Previous milestone must be completed first');
      }
    }

    // Validate completion percentage meets milestone requirement
    if (data.courseCompletionPercentage < milestone.percentage) {
      throw new BadRequestException(
        `Course completion (${data.courseCompletionPercentage}%) does not meet milestone requirement (${milestone.percentage}%)`,
      );
    }

    // Update loan progress
    loan.courseCompletionPercentage = data.courseCompletionPercentage;
    loan.attendancePercentage = data.attendancePercentage;
    if (data.assessmentScore !== undefined) {
      loan.assessmentScore = data.assessmentScore;
    }

    // Update milestone status
    const milestoneIndex = loan.milestoneProgress.findIndex(
      (m) => m.milestone === milestoneNumber,
    );
    if (milestoneIndex >= 0) {
      loan.milestoneProgress[milestoneIndex] = {
        ...loan.milestoneProgress[milestoneIndex],
        actualPercentage: data.courseCompletionPercentage,
        status: 'verified',
        verifiedAt: new Date(),
      };
    }

    loan.currentMilestone = milestoneNumber;
    await this.loanRepository.save(loan);

    // Trigger disbursement for verified milestone
    await this.createDisbursement(loanId, milestoneNumber);

    // If T3 (certification) milestone, update certification status
    if (milestoneNumber === 3) {
      loan.isCertified = true;
      loan.certificationDate = new Date();
      loan.status = LoanStatus.FULLY_DISBURSED;

      // Transition to moratorium
      setTimeout(async () => {
        await this.transitionToMoratorium(loanId);
      }, 1000);
    }

    return this.loanRepository.save(loan);
  }

  /**
   * Create disbursement record for a milestone
   */
  private async createDisbursement(loanId: string, milestoneNumber: number): Promise<Disbursement> {
    const loan = await this.findById(loanId);
    const milestone = this.milestones.find((m) => m.id === milestoneNumber);

    if (!milestone) {
      throw new BadRequestException('Invalid milestone');
    }

    const approvedAmount = loan.approvedAmount || loan.requestedAmount;
    const disbursementAmount = (approvedAmount * milestone.disbursementPercentage) / 100;

    const tp = await this.tpRepository.findOne({ where: { id: loan.trainingProviderId } });
    if (!tp) {
      throw new NotFoundException('Training provider not found');
    }

    const disbursement = this.disbursementRepository.create({
      loanId,
      status: DisbursementStatus.MILESTONE_VERIFIED,
      type: DisbursementType.MILESTONE,
      milestoneNumber,
      milestoneName: milestone.name,
      milestonePercentage: milestone.disbursementPercentage,
      amount: disbursementAmount,
      recipientType: 'training_provider',
      recipientId: tp.id,
      recipientAccountNumber: tp.bankAccountNumber,
      recipientIfsc: tp.bankIfsc,
      recipientName: tp.name,
      courseCompletionAtDisbursement: loan.courseCompletionPercentage,
      attendanceAtDisbursement: loan.attendancePercentage,
      transactionReference: `DIS-${loan.applicationNumber}-T${milestoneNumber}-${uuidv4().slice(0, 8)}`,
    });

    const savedDisbursement = await this.disbursementRepository.save(disbursement);

    // Update loan
    loan.disbursedAmount = (loan.disbursedAmount || 0) + disbursementAmount;
    loan.outstandingPrincipal = loan.disbursedAmount;
    loan.status = LoanStatus.DISBURSEMENT_IN_PROGRESS;

    // Update milestone progress
    const milestoneIndex = loan.milestoneProgress.findIndex(
      (m) => m.milestone === milestoneNumber,
    );
    if (milestoneIndex >= 0) {
      loan.milestoneProgress[milestoneIndex].status = 'disbursed';
      loan.milestoneProgress[milestoneIndex].disbursedAt = new Date();
      loan.milestoneProgress[milestoneIndex].disbursementId = savedDisbursement.id;
    }

    await this.loanRepository.save(loan);

    // In production, this would trigger actual bank transfer
    // For now, mark as completed after a delay (simulating bank processing)
    setTimeout(async () => {
      savedDisbursement.status = DisbursementStatus.COMPLETED;
      savedDisbursement.completedAt = new Date();
      savedDisbursement.utrNumber = `UTR${Date.now()}`;
      await this.disbursementRepository.save(savedDisbursement);
    }, 2000);

    return savedDisbursement;
  }

  /**
   * Transition loan to moratorium period
   */
  private async transitionToMoratorium(loanId: string): Promise<void> {
    const loan = await this.findById(loanId);
    loan.status = LoanStatus.IN_MORATORIUM;
    await this.loanRepository.save(loan);
  }

  /**
   * Generate EMI schedule and start repayment
   */
  async startRepayment(loanId: string): Promise<Loan> {
    const loan = await this.findById(loanId);

    if (loan.status !== LoanStatus.IN_MORATORIUM) {
      throw new BadRequestException('Loan must be in moratorium to start repayment');
    }

    loan.status = LoanStatus.IN_REPAYMENT;

    // Generate EMI schedule
    const stepUpMonths = this.configService.get<number>('loan.stepUpEmiMonths') || 6;
    const repayments: Partial<Repayment>[] = [];
    let dueDate = new Date(loan.firstEmiDate || new Date());

    for (let i = 1; i <= loan.totalEmis; i++) {
      const isStepUpEmi = i <= stepUpMonths;
      const emiAmount = isStepUpEmi ? loan.stepUpEmiAmount : loan.emiAmount;

      // Simple interest allocation (in production, would use proper amortization)
      const interestComponent = (loan.outstandingPrincipal * (loan.interestRate / 100)) / 12;
      const principalComponent = emiAmount - interestComponent;

      repayments.push({
        loanId,
        emiNumber: i,
        isStepUpEmi,
        principalComponent,
        interestComponent,
        emiAmount,
        totalDue: emiAmount,
        dueDate: new Date(dueDate),
        gracePeriodEnd: new Date(dueDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days grace
        status: RepaymentStatus.SCHEDULED,
      });

      // Next month
      dueDate.setMonth(dueDate.getMonth() + 1);
    }

    await this.repaymentRepository.save(repayments);
    return this.loanRepository.save(loan);
  }

  /**
   * Record EMI payment
   */
  async recordPayment(
    repaymentId: string,
    data: {
      amountPaid: number;
      paymentMethod: PaymentMethod;
      transactionReference: string;
      utrNumber?: string;
    },
  ): Promise<Repayment> {
    const repayment = await this.repaymentRepository.findOne({
      where: { id: repaymentId },
      relations: ['loan'],
    });

    if (!repayment) {
      throw new NotFoundException('Repayment not found');
    }

    repayment.amountPaid = data.amountPaid;
    repayment.paymentMethod = data.paymentMethod;
    repayment.paymentDate = new Date();
    repayment.transactionReference = data.transactionReference;
    repayment.utrNumber = data.utrNumber;

    if (data.amountPaid >= repayment.totalDue) {
      repayment.status = RepaymentStatus.COMPLETED;
    } else {
      repayment.status = RepaymentStatus.PARTIAL;
    }

    await this.repaymentRepository.save(repayment);

    // Update loan
    const loan = repayment.loan;
    loan.totalRepaid = (loan.totalRepaid || 0) + data.amountPaid;
    loan.outstandingPrincipal -= repayment.principalComponent;
    loan.emisPaid += 1;

    // Check if fully repaid
    if (loan.emisPaid >= loan.totalEmis) {
      loan.status = LoanStatus.CLOSED;
      loan.closureDate = new Date();
    }

    await this.loanRepository.save(loan);

    return repayment;
  }

  /**
   * Get loan by ID with relations
   */
  async findById(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['learner', 'course', 'trainingProvider', 'bank', 'disbursements', 'repayments'],
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  /**
   * Get loans by learner
   */
  async findByLearner(learnerId: string): Promise<Loan[]> {
    return this.loanRepository.find({
      where: { learnerId },
      relations: ['course', 'trainingProvider'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get loans by training provider
   */
  async findByTrainingProvider(trainingProviderId: string): Promise<Loan[]> {
    return this.loanRepository.find({
      where: { trainingProviderId },
      relations: ['learner', 'course'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get all loans with filters
   */
  async findAll(query: {
    status?: LoanStatus;
    trainingProviderId?: string;
    bankId?: string;
    page?: number;
    limit?: number;
  }) {
    const { status, trainingProviderId, bankId, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (trainingProviderId) where.trainingProviderId = trainingProviderId;
    if (bankId) where.bankId = bankId;

    const [loans, total] = await this.loanRepository.findAndCount({
      where,
      relations: ['learner', 'course', 'trainingProvider'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: loans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    const totalLoans = await this.loanRepository.count();
    const activeLoans = await this.loanRepository.count({
      where: { status: In([LoanStatus.ACTIVE, LoanStatus.IN_REPAYMENT]) },
    });

    const totalDisbursed = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.disbursedAmount)', 'total')
      .getRawOne();

    const totalRepaid = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.totalRepaid)', 'total')
      .getRawOne();

    const npaLoans = await this.loanRepository.count({
      where: { status: LoanStatus.NPA },
    });

    return {
      totalLoans,
      activeLoans,
      totalDisbursed: totalDisbursed?.total || 0,
      totalRepaid: totalRepaid?.total || 0,
      npaCount: npaLoans,
      npaRate: totalLoans > 0 ? (npaLoans / totalLoans) * 100 : 0,
    };
  }
}

