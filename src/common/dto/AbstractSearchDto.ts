'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { ToInt } from '../../decorators';

export class AbstractSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  q: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @ToInt()
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @ToInt()
  perPage = 10;
}
