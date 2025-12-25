import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'amir.khan@example.com',
    description: 'Email address or phone number',
  })
  @IsString()
  identifier: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token obtained during login' })
  @IsString()
  refreshToken: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password' })
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty({ description: 'New password' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class KycCallbackDto {
  @ApiProperty({ description: 'Aadhaar number' })
  @IsString()
  aadhaarNumber: string;

  @ApiProperty({ description: 'Name from Aadhaar' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Date of birth' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Address from Aadhaar' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Verification status' })
  verified: boolean;
}

