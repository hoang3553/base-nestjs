import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({
    description:
      'Sort field param. Sort follow the rule FIELD_NAME to sort ASC. -FIELD_NAME to sort DESC',
  })
  @IsOptional()
  readonly order: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  @IsOptional()
  readonly perPage: number = 10;

  @ApiPropertyOptional({
    description: 'Search field',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly q?: string;

  @ApiPropertyOptional({
    description: `Custom Filter using query param\n
    "FIELD_NAME": value" to filter extract value. Ex: name: "David" (Filter people name is David)\n
    "FIELD_NAME_$lt": value" to filter value less than field name. Ex age_$lt: 40 (Filter people age less than 40 years old)\n
    "FIELD_NAME_$gt": value" to filter value greater than field name. Ex age_$gt: 50 (Filter people age large than 50 year old)\n
    "FIELD_NAME_$start": value" to filter start by value. Ex: name_$start: "Da" (Filter people name start with Da)\n
    "FIELD_NAME_$in": value" to filter value in many choice. Ex: status_$in: ["ACTIVE", "PENDING"] (Filter order with status ACTIVE or PENDING)\n
    `,
  })
  @IsOptional()
  @Transform((value) => JSON.parse(value))
  readonly filter?: string;

  //   @ApiPropertyOptional({
  //     description: 'Include the model separate by ",". EX: includes=user,job',
  //   })
  //   @Transform((value) => value.split(','))
  //   @IsOptional()
  //   readonly includes: string;
}
