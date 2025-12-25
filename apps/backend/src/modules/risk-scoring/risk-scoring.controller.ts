import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { RiskScoringService } from './risk-scoring.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

/**
 * Risk Scoring Controller
 * 
 * API endpoints for calculating and retrieving Borrower Score and TPScore.
 */
@ApiTags('risk-scoring')
@Controller('risk-scoring')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RiskScoringController {
  constructor(private readonly riskScoringService: RiskScoringService) {}

  @Get('borrower/:userId')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER, UserRole.LEARNER)
  @ApiOperation({ summary: 'Calculate Borrower Score for a learner' })
  @ApiQuery({ name: 'courseId', required: false, description: 'Course ID for fit calculation' })
  @ApiResponse({
    status: 200,
    description: 'Borrower Score calculated successfully',
    schema: {
      example: {
        score: 72.5,
        components: {
          kycScore: 10,
          educationScore: 15,
          incomeScore: 10,
          courseFitScore: 20,
          commitmentScore: 12.5,
          communityScore: 5,
        },
        riskCategory: 'moderate',
        interestSpread: 1.5,
        eligibleForLoan: true,
        recommendations: ['Complete orientation module'],
      },
    },
  })
  async calculateBorrowerScore(
    @Param('userId') userId: string,
    @Query('courseId') courseId?: string,
  ) {
    return this.riskScoringService.calculateBorrowerScore(userId, courseId);
  }

  @Get('tp/:trainingProviderId')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER, UserRole.TRAINING_PROVIDER)
  @ApiOperation({ summary: 'Calculate TPScore for a training provider' })
  @ApiResponse({
    status: 200,
    description: 'TPScore calculated successfully',
    schema: {
      example: {
        score: 78,
        components: {
          completionScore: 24,
          certificationScore: 20,
          placementScore: 14,
          refundHistoryScore: 12,
          auditScore: 8,
        },
        performanceCategory: 'average',
        guaranteePercentage: 25,
        eligibleForNewEnrollments: true,
        recommendations: ['Strengthen industry partnerships'],
      },
    },
  })
  async calculateTPScore(@Param('trainingProviderId') trainingProviderId: string) {
    return this.riskScoringService.calculateTPScore(trainingProviderId);
  }

  @Post('guarantee/:trainingProviderId')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Calculate dynamic guarantee deposit for a TP' })
  @ApiResponse({
    status: 200,
    description: 'Guarantee amount calculated',
    schema: {
      example: {
        guaranteeAmount: 75000,
        guaranteePercentage: 15,
        formula: {
          pd: 10,
          ead: 500000,
          cgfssdCoverage: 75,
          riskBuffer: 1.2,
        },
      },
    },
  })
  async calculateDynamicGuarantee(
    @Param('trainingProviderId') trainingProviderId: string,
    @Body() body: { expectedDisbursements: number },
  ) {
    return this.riskScoringService.calculateDynamicGuarantee(
      trainingProviderId,
      body.expectedDisbursements,
    );
  }

  @Get('interest-rate/:borrowerScore')
  @ApiOperation({ summary: 'Calculate interest rate based on Borrower Score' })
  @ApiResponse({
    status: 200,
    description: 'Interest rate calculated',
    schema: {
      example: {
        totalRate: 10,
        mclrRate: 8.5,
        spreadRate: 1.5,
      },
    },
  })
  async calculateInterestRate(@Param('borrowerScore') borrowerScore: number) {
    return this.riskScoringService.calculateInterestRate(borrowerScore);
  }

  @Post('emi-calculator')
  @ApiOperation({ summary: 'Calculate EMI with step-up structure' })
  @ApiResponse({
    status: 200,
    description: 'EMI schedule generated',
    schema: {
      example: {
        standardEmi: 2500,
        stepUpEmi: 1250,
        totalPayable: 180000,
        totalInterest: 30000,
        schedule: [
          { month: 1, emi: 1250, principal: 800, interest: 450, balance: 149200 },
        ],
      },
    },
  })
  async calculateEMI(
    @Body() body: { principal: number; annualRate: number; tenureMonths: number },
  ) {
    return this.riskScoringService.calculateEMI(
      body.principal,
      body.annualRate,
      body.tenureMonths,
    );
  }
}

