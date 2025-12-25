import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from '../../entities/course.entity';
import { TrainingProvider } from '../../entities/training-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, TrainingProvider])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

