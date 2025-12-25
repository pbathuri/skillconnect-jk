import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Loan } from '../../entities/loan.entity';
import { Disbursement } from '../../entities/disbursement.entity';
import { Repayment } from '../../entities/repayment.entity';
import { User } from '../../entities/user.entity';
import { Course } from '../../entities/course.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';
import { Bank } from '../../entities/bank.entity';
import { RiskScoringModule } from '../risk-scoring/risk-scoring.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Loan,
      Disbursement,
      Repayment,
      User,
      Course,
      TrainingProvider,
      Bank,
    ]),
    RiskScoringModule,
  ],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService],
})
export class LoansModule {}

