import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 6 })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ minLength: 6 })
  newPassword: string;
}
