import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
export class Cat {
  @ApiProperty()
  // eslint-disable-next-line @typescript-eslint/tslint/config
  _id?: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiPropertyOptional()
  age: number;

  @Prop()
  @ApiPropertyOptional()
  breed: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CatSchema = SchemaFactory.createForClass(Cat);
