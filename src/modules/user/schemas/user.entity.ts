import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @ApiProperty()
    // eslint-disable-next-line @typescript-eslint/tslint/config
    _id?: string;
  
  @Prop({ required: true })
  @ApiPropertyOptional()
  firstName: string;

  @Prop({ required: true })
  @ApiPropertyOptional()
  lastName: string;

  @Prop({ required: true })
  @ApiPropertyOptional()
  email: string;

  @Prop({ required: true, hidden: true })
  @ApiPropertyOptional()
  password: string;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserSchema = SchemaFactory.createForClass(User);
