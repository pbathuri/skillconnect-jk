import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingProvidersService } from './training-providers.service';
import { TrainingProvidersController } from './training-providers.controller';
import { TrainingProvider } from '../../entities/training-provider.entity';
import { Course } from '../../entities/course.entity';
import { Loan } from '../../entities/loan.entity';
import { Attendance } from '../../entities/attendance.entity';
import { Assessment } from '../../entities/assessment.entity';
import { RiskScoringModule } from '../risk-scoring/risk-scoring.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingProvider, Course, Loan, Attendance, Assessment]),
    RiskScoringModule,
  ],
  controllers: [TrainingProvidersController],
  providers: [TrainingProvidersService],
  exports: [TrainingProvidersService],
})
export class TrainingProvidersModule {}

