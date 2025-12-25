import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../../entities/user.entity';
import { Loan } from '../../entities/loan.entity';
import { Course } from '../../entities/course.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Loan, Course, TrainingProvider])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

