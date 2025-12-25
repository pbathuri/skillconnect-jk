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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TrainingProvidersService } from './training-providers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole, User } from '../../entities/user.entity';
import { TPStatus, TrainingProvider } from '../../entities/training-provider.entity';

@ApiTags('training-providers')
@Controller('training-providers')
export class TrainingProvidersController {
  constructor(private readonly tpService: TrainingProvidersService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all training providers' })
  @ApiQuery({ name: 'status', required: false, enum: TPStatus })
  @ApiQuery({ name: 'search', required: false })
  async findAll(
    @Query('status') status?: TPStatus,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.tpService.findAll({ status, search, page, limit });
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get training provider by ID' })
  async findById(@Param('id') id: string) {
    return this.tpService.findById(id);
  }

  @Get(':id/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get TP dashboard' })
  async getDashboard(@Param('id') id: string) {
    return this.tpService.getDashboard(id);
  }

  @Get(':id/score')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN, UserRole.BANK_OFFICER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get TPScore' })
  async getScore(@Param('id') id: string) {
    return this.tpService.getTPScore(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register new training provider' })
  async create(@Body() data: Partial<TrainingProvider>) {
    return this.tpService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update training provider' })
  async update(@Param('id') id: string, @Body() data: Partial<TrainingProvider>) {
    return this.tpService.update(id, data);
  }

  @Put(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve training provider' })
  async approve(@Param('id') id: string) {
    return this.tpService.approve(id);
  }

  @Post(':id/attendance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload attendance records' })
  async uploadAttendance(@Param('id') id: string, @Body() data: any) {
    return this.tpService.uploadAttendance(id, data);
  }

  @Post(':id/assessment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TRAINING_PROVIDER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload assessment record' })
  async uploadAssessment(@Param('id') id: string, @Body() data: any) {
    return this.tpService.uploadAssessment(id, data);
  }

  @Put(':id/guarantee-deposit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update guarantee deposit' })
  async updateGuarantee(@Param('id') id: string, @Body() body: { amount: number }) {
    return this.tpService.updateGuaranteeDeposit(id, body.amount);
  }
}

