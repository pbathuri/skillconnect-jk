import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Amir' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Khan' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'amir.khan@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  @Matches(/^\+91[0-9]{10}$/, {
    message: 'Phone must be a valid Indian mobile number with +91 prefix',
  })
  phone?: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase, one lowercase, one number, and one special character',
  })
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.LEARNER,
    description: 'User role (default: learner)',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: '1998-05-15' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'en', description: 'Preferred language (en, hi, ur, ks)' })
  @IsOptional()
  @IsString()
  @Matches(/^(en|hi|ur|ks)$/, {
    message: 'Preferred language must be one of: en, hi, ur, ks',
  })
  preferredLanguage?: string;

  @ApiPropertyOptional({ example: 'Srinagar' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Srinagar' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ example: '190001' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{6}$/, { message: 'Pin code must be 6 digits' })
  pinCode?: string;
}

