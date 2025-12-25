import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskScoringService } from './risk-scoring.service';
import { RiskScoringController } from './risk-scoring.controller';
import { User } from '../../entities/user.entity';
import { LearnerProfile } from '../../entities/learner-profile.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';
import { Course } from '../../entities/course.entity';
import { Loan } from '../../entities/loan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LearnerProfile,
      TrainingProvider,
      Course,
      Loan,
    ]),
  ],
  controllers: [RiskScoringController],
  providers: [RiskScoringService],
  exports: [RiskScoringService],
})
export class RiskScoringModule {}

