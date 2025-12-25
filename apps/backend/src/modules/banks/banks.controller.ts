import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BanksService } from './banks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { Bank } from '../../entities/bank.entity';

@ApiTags('banks')
@Controller('banks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all banks' })
  async findAll() {
    return this.banksService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Get bank by ID' })
  async findById(@Param('id') id: string) {
    return this.banksService.findById(id);
  }

  @Get(':id/dashboard')
  @Roles(UserRole.BANK_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get bank dashboard' })
  async getDashboard(@Param('id') id: string) {
    return this.banksService.getDashboard(id);
  }

  @Get(':id/pending-applications')
  @Roles(UserRole.BANK_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get pending loan applications' })
  async getPendingApplications(@Param('id') id: string) {
    return this.banksService.getPendingApplications(id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Register new bank' })
  async create(@Body() data: Partial<Bank>) {
    return this.banksService.create(data);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update bank' })
  async update(@Param('id') id: string, @Body() data: Partial<Bank>) {
    return this.banksService.update(id, data);
  }
}

