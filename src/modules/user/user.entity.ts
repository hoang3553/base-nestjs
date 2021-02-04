import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CatDocument = User & Document;

@Schema()
export class User {
  @ApiPropertyOptional()
  @Prop()
  firstName: string;

  @ApiPropertyOptional()
  @Prop()
  lastName: string;

  @ApiPropertyOptional()
  @Prop()
  email: string;

  @Prop({ hidden: true })
  password: string;

  @ApiPropertyOptional()
  @Prop()
  age: number;

  @ApiPropertyOptional()
  @Prop()
  phone: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserEntity = SchemaFactory.createForClass(User);
