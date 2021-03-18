import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @ApiProperty()
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly breed: string;
}
