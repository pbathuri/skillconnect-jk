import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { LoansService } from './loans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, User } from '../../entities/user.entity';
import { LoanStatus, LoanPurpose } from '../../entities/loan.entity';
import { PaymentMethod } from '../../entities/repayment.entity';

@ApiTags('loans')
@Controller('loans')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('apply')
  @Roles(UserRole.LEARNER)
  @ApiOperation({ summary: 'Apply for a skill loan' })
  @ApiResponse({
    status: 201,
    description: 'Loan application created successfully',
  })
  async apply(
    @Request() req: { user: User },
    @Body()
    body: {
      courseId: string;
      requestedAmount: number;
      purpose?: LoanPurpose;
      deviceAmount?: number;
      tenureMonths?: number;
    },
  ) {
    return this.loansService.createApplication({
      learnerId: req.user.id,
      ...body,
    });
  }

  @Post(':id/submit')
  @Roles(UserRole.LEARNER)
  @ApiOperation({ summary: 'Submit loan application for review' })
  async submit(@Param('id') id: string, @Request() req: { user: User }) {
    return this.loansService.submitApplication(id, req.user.id);
  }

  @Put(':id/bank-decision')
  @Roles(UserRole.BANK_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Bank approves or rejects loan' })
  async bankDecision(
    @Param('id') id: string,
    @Request() req: { user: User },
    @Body()
    body: {
      decision: 'approve' | 'reject';
      approvedAmount?: number;
      rejectionReason?: string;
    },
  ) {
    return this.loansService.bankDecision(id, body.decision, req.user.id, {
      approvedAmount: body.approvedAmount,
      rejectionReason: body.rejectionReason,
    });
  }

  @Post(':id/activate')
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Activate loan and trigger first disbursement' })
  async activate(@Param('id') id: string) {
    return this.loansService.activateLoan(id);
  }

  @Post(':id/milestones/:milestone/verify')
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Verify milestone completion and trigger disbursement' })
  async verifyMilestone(
    @Param('id') id: string,
    @Param('milestone') milestone: number,
    @Request() req: { user: User },
    @Body()
    body: {
      courseCompletionPercentage: number;
      attendancePercentage: number;
      assessmentScore?: number;
    },
  ) {
    return this.loansService.verifyMilestone(id, milestone, req.user.id, body);
  }

  @Post(':id/start-repayment')
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Start EMI repayment phase' })
  async startRepayment(@Param('id') id: string) {
    return this.loansService.startRepayment(id);
  }

  @Post('repayments/:repaymentId/record')
  @Roles(UserRole.BANK_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Record EMI payment' })
  async recordPayment(
    @Param('repaymentId') repaymentId: string,
    @Body()
    body: {
      amountPaid: number;
      paymentMethod: PaymentMethod;
      transactionReference: string;
      utrNumber?: string;
    },
  ) {
    return this.loansService.recordPayment(repaymentId, body);
  }

  @Get('my-loans')
  @Roles(UserRole.LEARNER)
  @ApiOperation({ summary: 'Get current user loans' })
  async getMyLoans(@Request() req: { user: User }) {
    return this.loansService.findByLearner(req.user.id);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Get loan statistics' })
  async getStats() {
    return this.loansService.getDashboardStats();
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Get all loans with filters' })
  @ApiQuery({ name: 'status', required: false, enum: LoanStatus })
  @ApiQuery({ name: 'trainingProviderId', required: false })
  @ApiQuery({ name: 'bankId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('status') status?: LoanStatus,
    @Query('trainingProviderId') trainingProviderId?: string,
    @Query('bankId') bankId?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.loansService.findAll({
      status,
      trainingProviderId,
      bankId,
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get loan by ID' })
  async findById(@Param('id') id: string, @Request() req: { user: User }) {
    const loan = await this.loansService.findById(id);

    // Learners can only see their own loans
    if (req.user.role === UserRole.LEARNER && loan.learnerId !== req.user.id) {
      throw new Error('Access denied');
    }

    return loan;
  }
}

