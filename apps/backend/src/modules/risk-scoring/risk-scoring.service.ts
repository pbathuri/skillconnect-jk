import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, KycStatus } from '../../entities/user.entity';
import { LearnerProfile, EducationLevel, IncomeRange } from '../../entities/learner-profile.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';
import { Course, CourseSector } from '../../entities/course.entity';
import { Loan } from '../../entities/loan.entity';

/**
 * Borrower Score Components (as per Risk & Credit Policy)
 * Total: 100 points
 */
interface BorrowerScoreComponents {
  kycScore: number;           // 10% - KYC & Identity Verification
  educationScore: number;     // 20% - Education & Skills Baseline
  incomeScore: number;        // 15% - Income & Financial Information
  courseFitScore: number;     // 25% - Course Fit & Demand
  commitmentScore: number;    // 20% - Commitment Indicators
  communityScore: number;     // 10% - Community Endorsement
}

/**
 * TPScore Components (as per Risk & Credit Policy)
 * Total: 100 points
 */
interface TPScoreComponents {
  completionScore: number;    // 30% - Completion Rate
  certificationScore: number; // 25% - Certification Rate
  placementScore: number;     // 20% - Placement Rate
  refundHistoryScore: number; // 15% - Refund History
  auditScore: number;         // 10% - Audit & Compliance
}

/**
 * Risk Scoring Service
 * 
 * Implements Borrower Score (0-100) and TPScore (0-100) computation
 * as defined in the Risk & Credit Policy Appendix.
 * 
 * Score Thresholds:
 * - Borrower Score >= 80: Low risk, lowest spread (1% p.a.)
 * - Borrower Score 50-79: Moderate risk, may require co-signer (1.5% p.a.)
 * - Borrower Score < 50: High risk, may be declined (2% p.a.)
 * 
 * - TPScore >= 80: Strong, guarantee deposit 15%
 * - TPScore 50-79: Average, guarantee deposit 25-30%
 * - TPScore < 50: Risky, guarantee deposit > 30% or barred
 */
@Injectable()
export class RiskScoringService {
  // High-demand sectors in J&K get bonus points
  private readonly highDemandSectors = [
    CourseSector.IT_ITES,
    CourseSector.ELECTRONICS,
    CourseSector.TOURISM_HOSPITALITY,
  ];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LearnerProfile)
    private readonly learnerProfileRepository: Repository<LearnerProfile>,
    @InjectRepository(TrainingProvider)
    private readonly trainingProviderRepository: Repository<TrainingProvider>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Calculate Borrower Score for a learner
   * Returns score 0-100 and component breakdown
   */
  async calculateBorrowerScore(
    userId: string,
    courseId?: string,
  ): Promise<{
    score: number;
    components: BorrowerScoreComponents;
    riskCategory: 'low' | 'moderate' | 'high';
    interestSpread: number;
    eligibleForLoan: boolean;
    recommendations: string[];
  }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = await this.learnerProfileRepository.findOne({
      where: { userId },
    });

    let course: Course | null = null;
    if (courseId) {
      course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
    }

    const components = await this.calculateBorrowerComponents(user, profile, course);
    const score = this.sumComponents(components);
    const { riskCategory, interestSpread } = this.getRiskCategory(score);
    const recommendations = this.generateRecommendations(components, profile);

    // Update profile with calculated score
    if (profile) {
      profile.borrowerScore = score;
      profile.borrowerScoreComponents = components;
      profile.borrowerScoreUpdatedAt = new Date();
      await this.learnerProfileRepository.save(profile);
    }

    return {
      score: Math.round(score * 100) / 100,
      components,
      riskCategory,
      interestSpread,
      eligibleForLoan: score >= 50,
      recommendations,
    };
  }

  /**
   * Calculate TPScore for a training provider
   */
  async calculateTPScore(trainingProviderId: string): Promise<{
    score: number;
    components: TPScoreComponents;
    performanceCategory: 'strong' | 'average' | 'risky';
    guaranteePercentage: number;
    eligibleForNewEnrollments: boolean;
    recommendations: string[];
  }> {
    const tp = await this.trainingProviderRepository.findOne({
      where: { id: trainingProviderId },
    });

    if (!tp) {
      throw new NotFoundException('Training provider not found');
    }

    const components = await this.calculateTPComponents(tp);
    const score = this.sumTPComponents(components);
    const { performanceCategory, guaranteePercentage } = this.getTPCategory(score);
    const recommendations = this.generateTPRecommendations(components, tp);

    // Update TP with calculated score
    tp.tpScore = score;
    tp.tpScoreComponents = components;
    tp.tpScoreUpdatedAt = new Date();
    tp.guaranteeDepositPercentage = guaranteePercentage;
    await this.trainingProviderRepository.save(tp);

    return {
      score: Math.round(score * 100) / 100,
      components,
      performanceCategory,
      guaranteePercentage,
      eligibleForNewEnrollments: score >= 50,
      recommendations,
    };
  }

  /**
   * Calculate dynamic guarantee deposit amount for a TP
   * Based on formula: GD = E[max(0, p * PD * EAD * (1 - CGFSSD_coverage))]
   */
  async calculateDynamicGuarantee(
    trainingProviderId: string,
    expectedDisbursements: number,
  ): Promise<{
    guaranteeAmount: number;
    guaranteePercentage: number;
    formula: {
      pd: number;
      ead: number;
      cgfssdCoverage: number;
      riskBuffer: number;
    };
  }> {
    const { score } = await this.calculateTPScore(trainingProviderId);
    
    // Estimate PD from TPScore (inverse relationship)
    const pd = Math.max(0.05, (100 - score) / 100 * 0.5); // 5% to 50%
    
    const cgfssdCoverage = this.configService.get<number>('cgfssd.coveragePercentage') / 100 || 0.75;
    const riskBuffer = 1.2; // 20% risk buffer
    
    // GD = p * PD * EAD * (1 - CGFSSD_coverage)
    const guaranteeAmount = Math.max(
      0,
      riskBuffer * pd * expectedDisbursements * (1 - cgfssdCoverage),
    );
    
    const guaranteePercentage = (guaranteeAmount / expectedDisbursements) * 100;

    return {
      guaranteeAmount: Math.round(guaranteeAmount),
      guaranteePercentage: Math.round(guaranteePercentage * 100) / 100,
      formula: {
        pd: Math.round(pd * 10000) / 100,
        ead: expectedDisbursements,
        cgfssdCoverage: cgfssdCoverage * 100,
        riskBuffer,
      },
    };
  }

  /**
   * Calculate interest rate based on Borrower Score
   */
  calculateInterestRate(borrowerScore: number): {
    totalRate: number;
    mclrRate: number;
    spreadRate: number;
  } {
    const mclrRate = this.configService.get<number>('platform.mclrRate') || 8.5;
    const { interestSpread } = this.getRiskCategory(borrowerScore);

    return {
      totalRate: mclrRate + interestSpread,
      mclrRate,
      spreadRate: interestSpread,
    };
  }

  /**
   * Calculate EMI with step-up structure
   * First 6 EMIs at 50%, then full EMI
   */
  calculateEMI(
    principal: number,
    annualRate: number,
    tenureMonths: number,
  ): {
    standardEmi: number;
    stepUpEmi: number;
    totalPayable: number;
    totalInterest: number;
    schedule: Array<{
      month: number;
      emi: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  } {
    const monthlyRate = annualRate / 12 / 100;
    
    // Standard EMI calculation using formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const standardEmi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                       (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    // Step-up EMI (first 6 months at 50%)
    const stepUpEmiMonths = this.configService.get<number>('loan.stepUpEmiMonths') || 6;
    const stepUpPercentage = this.configService.get<number>('loan.stepUpEmiPercentage') || 50;
    const stepUpEmi = standardEmi * (stepUpPercentage / 100);

    // Generate amortization schedule
    const schedule: Array<{
      month: number;
      emi: number;
      principal: number;
      interest: number;
      balance: number;
    }> = [];

    let balance = principal;
    let totalPayable = 0;

    for (let month = 1; month <= tenureMonths; month++) {
      const interest = balance * monthlyRate;
      const emi = month <= stepUpEmiMonths ? stepUpEmi : standardEmi;
      const principalPart = Math.min(emi - interest, balance);
      balance = Math.max(0, balance - principalPart);
      totalPayable += emi;

      schedule.push({
        month,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principalPart * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });
    }

    return {
      standardEmi: Math.round(standardEmi * 100) / 100,
      stepUpEmi: Math.round(stepUpEmi * 100) / 100,
      totalPayable: Math.round(totalPayable * 100) / 100,
      totalInterest: Math.round((totalPayable - principal) * 100) / 100,
      schedule,
    };
  }

  // ============ Private Helper Methods ============

  private async calculateBorrowerComponents(
    user: User,
    profile: LearnerProfile | null,
    course: Course | null,
  ): Promise<BorrowerScoreComponents> {
    return {
      kycScore: this.calculateKycScore(user),
      educationScore: this.calculateEducationScore(profile),
      incomeScore: this.calculateIncomeScore(profile),
      courseFitScore: this.calculateCourseFitScore(profile, course),
      commitmentScore: this.calculateCommitmentScore(profile),
      communityScore: this.calculateCommunityScore(profile),
    };
  }

  /**
   * KYC & Identity Verification (10%)
   */
  private calculateKycScore(user: User): number {
    let score = 0;
    const maxScore = 10;

    // Aadhaar verification (7 points)
    if (user.kycStatus === KycStatus.VERIFIED && user.aadhaarVerified) {
      score += 7;
    } else if (user.kycStatus === KycStatus.PENDING) {
      score += 2;
    }

    // Address verification (2 points)
    if (user.addressLine1 && user.pinCode && user.district) {
      score += 2;
    }

    // Additional ID (PAN) (1 point)
    if (user.panNumber) {
      score += 1;
    }

    return Math.min(score, maxScore);
  }

  /**
   * Education & Skills Baseline (20%)
   */
  private calculateEducationScore(profile: LearnerProfile | null): number {
    let score = 0;
    const maxScore = 20;

    if (!profile) return 5; // Neutral score for missing profile

    // Education level (12 points)
    const educationPoints: Record<EducationLevel, number> = {
      [EducationLevel.BELOW_10TH]: 2,
      [EducationLevel.TENTH]: 5,
      [EducationLevel.TWELFTH]: 8,
      [EducationLevel.DIPLOMA]: 10,
      [EducationLevel.GRADUATE]: 11,
      [EducationLevel.POST_GRADUATE]: 12,
    };
    
    if (profile.educationLevel) {
      score += educationPoints[profile.educationLevel] || 0;
    }

    // Baseline assessment score (5 points)
    if (profile.baselineAssessmentScore !== null) {
      score += (profile.baselineAssessmentScore / 100) * 5;
    }

    // Prior certifications (3 points)
    const certCount = profile.priorCertifications?.length || 0;
    score += Math.min(certCount, 3);

    return Math.min(score, maxScore);
  }

  /**
   * Income & Financial Information (15%)
   */
  private calculateIncomeScore(profile: LearnerProfile | null): number {
    let score = 7.5; // Neutral score for unbanked
    const maxScore = 15;

    if (!profile) return score;

    // Has bank account (3 points)
    if (profile.hasBankAccount) {
      score += 3;
    }

    // Income range (6 points)
    const incomePoints: Record<IncomeRange, number> = {
      [IncomeRange.BELOW_1L]: 2,
      [IncomeRange.L1_TO_3L]: 4,
      [IncomeRange.L3_TO_5L]: 5,
      [IncomeRange.ABOVE_5L]: 6,
      [IncomeRange.NOT_DISCLOSED]: 0,
    };
    
    if (profile.incomeRange && profile.incomeRange !== IncomeRange.NOT_DISCLOSED) {
      score = 0; // Reset neutral score
      score += incomePoints[profile.incomeRange] || 0;
      if (profile.hasBankAccount) score += 3;
    }

    // Credit history (3 points)
    if (profile.creditBureauScore !== null) {
      if (profile.creditBureauScore >= 750) {
        score += 3;
      } else if (profile.creditBureauScore >= 650) {
        score += 2;
      } else if (profile.creditBureauScore >= 550) {
        score += 1;
      }
    }

    // Previous loan repayment history (3 points)
    if (profile.hasPreviousLoans && !profile.existingLoanAmount) {
      score += 3; // Successfully repaid previous loans
    }

    return Math.min(score, maxScore);
  }

  /**
   * Course Fit & Demand (25%)
   */
  private calculateCourseFitScore(
    profile: LearnerProfile | null,
    course: Course | null,
  ): number {
    let score = 12.5; // Neutral score
    const maxScore = 25;

    if (!course) return score;

    // High-demand sector (10 points)
    if (this.highDemandSectors.includes(course.sector)) {
      score = 10;
    } else {
      score = 5;
    }

    // Job demand index of course (8 points)
    if (course.jobDemandIndex) {
      score += (course.jobDemandIndex / 100) * 8;
    }

    // Alignment with learner goals (5 points)
    if (profile?.preferredSectors?.includes(course.sector)) {
      score += 5;
    }

    // Placement rate history (2 points)
    if (course.placementRate && course.placementRate >= 50) {
      score += 2;
    }

    return Math.min(score, maxScore);
  }

  /**
   * Commitment Indicators (20%)
   */
  private calculateCommitmentScore(profile: LearnerProfile | null): number {
    let score = 10; // Neutral score
    const maxScore = 20;

    if (!profile) return score;

    // Document submission timeliness (6 points)
    if (profile.documentsSubmittedAt) {
      const hoursSinceCreation = profile.enrollmentCompletionTimeHours;
      if (hoursSinceCreation && hoursSinceCreation <= 24) {
        score = 6;
      } else if (hoursSinceCreation && hoursSinceCreation <= 72) {
        score = 4;
      } else {
        score = 2;
      }
    } else {
      score = 0;
    }

    // Orientation completion (7 points)
    if (profile.orientationCompleted) {
      score += 5;
      if (profile.orientationScore && profile.orientationScore >= 70) {
        score += 2;
      }
    }

    // Engagement score (7 points)
    if (profile.engagementScore !== null) {
      score += (profile.engagementScore / 100) * 7;
    }

    return Math.min(score, maxScore);
  }

  /**
   * Community Endorsement (10%)
   */
  private calculateCommunityScore(profile: LearnerProfile | null): number {
    let score = 5; // Neutral score
    const maxScore = 10;

    if (!profile || !profile.endorsements?.length) return score;

    score = 0;
    const endorsements = profile.endorsements;

    // Each verified endorsement adds points (max 3 endorsements counted)
    const verifiedEndorsements = endorsements.filter(e => e.verified).slice(0, 3);
    
    for (const endorsement of verifiedEndorsements) {
      switch (endorsement.endorserType) {
        case 'employer':
          score += 4; // Previous employer endorsement is strongest
          break;
        case 'community_leader':
          score += 3;
          break;
        case 'ngo':
          score += 2.5;
          break;
        case 'teacher':
          score += 2;
          break;
      }
    }

    return Math.min(score, maxScore);
  }

  private async calculateTPComponents(tp: TrainingProvider): Promise<TPScoreComponents> {
    return {
      completionScore: this.calculateCompletionScore(tp),
      certificationScore: this.calculateCertificationScore(tp),
      placementScore: this.calculatePlacementScore(tp),
      refundHistoryScore: this.calculateRefundHistoryScore(tp),
      auditScore: this.calculateAuditComplianceScore(tp),
    };
  }

  /**
   * Completion Rate (30%)
   */
  private calculateCompletionScore(tp: TrainingProvider): number {
    const maxScore = 30;
    const completionRate = tp.completionRate || 0;
    
    // Linear scale: 0% completion = 0 points, 100% completion = 30 points
    return Math.min((completionRate / 100) * maxScore, maxScore);
  }

  /**
   * Certification Rate (25%) - Baseline should be >= 62%
   */
  private calculateCertificationScore(tp: TrainingProvider): number {
    const maxScore = 25;
    const certificationRate = tp.certificationRate || 0;
    const baselineRate = 62; // PMKVY baseline

    if (certificationRate >= 90) {
      return maxScore;
    } else if (certificationRate >= baselineRate) {
      return 15 + ((certificationRate - baselineRate) / (90 - baselineRate)) * 10;
    } else {
      return (certificationRate / baselineRate) * 15;
    }
  }

  /**
   * Placement Rate (20%)
   */
  private calculatePlacementScore(tp: TrainingProvider): number {
    const maxScore = 20;
    const placementRate = tp.placementRate || 0;
    
    // Target: 50% placement
    if (placementRate >= 70) {
      return maxScore;
    } else if (placementRate >= 50) {
      return 15 + ((placementRate - 50) / 20) * 5;
    } else {
      return (placementRate / 50) * 15;
    }
  }

  /**
   * Refund History (15%) - Fewer guarantee claims = higher score
   */
  private calculateRefundHistoryScore(tp: TrainingProvider): number {
    const maxScore = 15;
    const totalClaims = tp.totalGuaranteeClaims || 0;
    const totalEnrolled = tp.totalLearnersEnrolled || 1;
    
    const claimRate = totalClaims / totalEnrolled;
    
    if (claimRate === 0) {
      return maxScore;
    } else if (claimRate <= 0.05) {
      return 12;
    } else if (claimRate <= 0.10) {
      return 9;
    } else if (claimRate <= 0.20) {
      return 6;
    } else {
      return Math.max(0, 6 - (claimRate - 0.20) * 30);
    }
  }

  /**
   * Audit & Compliance (10%)
   */
  private calculateAuditComplianceScore(tp: TrainingProvider): number {
    const maxScore = 10;
    let score = 5; // Base score

    // Audit score (5 points)
    if (tp.auditScore !== null) {
      score = (tp.auditScore / 100) * 5;
    }

    // Recent audit (3 points)
    if (tp.lastAuditDate) {
      const monthsSinceAudit = this.monthsBetween(tp.lastAuditDate, new Date());
      if (monthsSinceAudit <= 6) {
        score += 3;
      } else if (monthsSinceAudit <= 12) {
        score += 2;
      } else {
        score += 1;
      }
    }

    // No compliance violations (2 points)
    if (tp.complianceViolations === 0) {
      score += 2;
    } else if (tp.complianceViolations <= 2) {
      score += 1;
    }

    return Math.min(score, maxScore);
  }

  private sumComponents(components: BorrowerScoreComponents): number {
    return (
      components.kycScore +
      components.educationScore +
      components.incomeScore +
      components.courseFitScore +
      components.commitmentScore +
      components.communityScore
    );
  }

  private sumTPComponents(components: TPScoreComponents): number {
    return (
      components.completionScore +
      components.certificationScore +
      components.placementScore +
      components.refundHistoryScore +
      components.auditScore
    );
  }

  private getRiskCategory(score: number): {
    riskCategory: 'low' | 'moderate' | 'high';
    interestSpread: number;
  } {
    if (score >= 80) {
      return {
        riskCategory: 'low',
        interestSpread: this.configService.get<number>('interestSpread.lowRisk') || 1.0,
      };
    } else if (score >= 50) {
      return {
        riskCategory: 'moderate',
        interestSpread: this.configService.get<number>('interestSpread.moderateRisk') || 1.5,
      };
    } else {
      return {
        riskCategory: 'high',
        interestSpread: this.configService.get<number>('interestSpread.highRisk') || 2.0,
      };
    }
  }

  private getTPCategory(score: number): {
    performanceCategory: 'strong' | 'average' | 'risky';
    guaranteePercentage: number;
  } {
    if (score >= 80) {
      return {
        performanceCategory: 'strong',
        guaranteePercentage: this.configService.get<number>('tpGuarantee.strong') || 15,
      };
    } else if (score >= 50) {
      return {
        performanceCategory: 'average',
        guaranteePercentage: this.configService.get<number>('tpGuarantee.average') || 25,
      };
    } else {
      return {
        performanceCategory: 'risky',
        guaranteePercentage: this.configService.get<number>('tpGuarantee.risky') || 30,
      };
    }
  }

  private generateRecommendations(
    components: BorrowerScoreComponents,
    profile: LearnerProfile | null,
  ): string[] {
    const recommendations: string[] = [];

    if (components.kycScore < 7) {
      recommendations.push('Complete Aadhaar verification via DigiLocker for better score');
    }

    if (components.educationScore < 10) {
      recommendations.push('Upload educational certificates to improve your profile');
    }

    if (components.incomeScore < 7) {
      recommendations.push('Link a bank account for improved financial credibility');
    }

    if (components.commitmentScore < 10) {
      recommendations.push('Complete the orientation module to demonstrate commitment');
    }

    if (components.communityScore < 5) {
      recommendations.push('Get endorsements from previous employers or community leaders');
    }

    return recommendations;
  }

  private generateTPRecommendations(
    components: TPScoreComponents,
    tp: TrainingProvider,
  ): string[] {
    const recommendations: string[] = [];

    if (components.completionScore < 20) {
      recommendations.push('Focus on improving course completion rates through better student support');
    }

    if (components.certificationScore < 15) {
      recommendations.push('Enhance certification preparation to meet the 62% baseline');
    }

    if (components.placementScore < 10) {
      recommendations.push('Strengthen industry partnerships for better placement outcomes');
    }

    if (components.refundHistoryScore < 10) {
      recommendations.push('Reduce dropout rates to minimize guarantee claims');
    }

    if (components.auditScore < 7) {
      recommendations.push('Schedule a compliance audit to improve standing');
    }

    return recommendations;
  }

  private monthsBetween(date1: Date, date2: Date): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.abs(
      (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()),
    );
  }
}

