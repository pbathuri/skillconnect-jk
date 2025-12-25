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
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole, User } from '../../entities/user.entity';
import { CourseStatus, CourseSector, CourseMode, Course } from '../../entities/course.entity';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all courses with filters' })
  @ApiQuery({ name: 'sector', required: false, enum: CourseSector })
  @ApiQuery({ name: 'mode', required: false, enum: CourseMode })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'minFee', required: false, type: Number })
  @ApiQuery({ name: 'maxFee', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('sector') sector?: CourseSector,
    @Query('mode') mode?: CourseMode,
    @Query('search') search?: string,
    @Query('minFee') minFee?: number,
    @Query('maxFee') maxFee?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.coursesService.findAll({
      sector,
      mode,
      search,
      minFee,
      maxFee,
      page,
      limit,
    });
  }

  @Get('popular')
  @Public()
  @ApiOperation({ summary: 'Get popular courses' })
  async getPopular(@Query('limit') limit?: number) {
    return this.coursesService.getPopularCourses(limit);
  }

  @Get('sectors')
  @Public()
  @ApiOperation({ summary: 'Get available sectors with course counts' })
  async getSectors() {
    return this.coursesService.getSectors();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get course by ID' })
  async findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  async create(@Body() data: Partial<Course>, @Request() req: { user: User }) {
    return this.coursesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update course' })
  async update(@Param('id') id: string, @Body() data: Partial<Course>) {
    return this.coursesService.update(id, data);
  }

  @Put(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve course' })
  async approve(@Param('id') id: string, @Request() req: { user: User }) {
    return this.coursesService.approve(id, req.user.id);
  }
}

