import {
  Controller,
  Get,
  Put,
  Delete,
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
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, UserStatus, User } from '../../entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiQuery({ name: 'role', required: false, enum: UserRole })
  @ApiQuery({ name: 'status', required: false, enum: UserStatus })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('role') role?: UserRole,
    @Query('status') status?: UserStatus,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.usersService.findAll({ role, status, page, limit });
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@Request() req: { user: User }) {
    return this.usersService.findById(req.user.id);
  }

  @Get('me/learner-profile')
  @Roles(UserRole.LEARNER)
  @ApiOperation({ summary: 'Get current user learner profile' })
  async getMyLearnerProfile(@Request() req: { user: User }) {
    return this.usersService.getLearnerProfile(req.user.id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(@Request() req: { user: User }, @Body() data: Partial<User>) {
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Put('me/learner-profile')
  @Roles(UserRole.LEARNER)
  @ApiOperation({ summary: 'Update learner profile' })
  async updateMyLearnerProfile(
    @Request() req: { user: User },
    @Body() data: any,
  ) {
    return this.usersService.updateLearnerProfile(req.user.id, data);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get user statistics' })
  async getStats() {
    return this.usersService.getDashboardStats();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BANK_OFFICER)
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id/status')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update user status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: UserStatus },
  ) {
    return this.usersService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete user (super admin only)' })
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}

