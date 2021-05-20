import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// eslint-disable-next-line @typescript-eslint/tslint/config
export enum USER_ROLES {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

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

  @Prop({ required: true, index: true })
  @ApiPropertyOptional()
  email: string;

  @Prop({ required: true, select: false })
  @ApiPropertyOptional()
  password: string;

  @Prop({ required: true, default: false })
  @ApiPropertyOptional()
  isVerifiedEmail: boolean;

  @Prop({ required: false })
  @ApiPropertyOptional()
  avatar?: string;

  @Prop({ required: false, index: true })
  @ApiPropertyOptional()
  facebookId?: string;

  @Prop({ required: false, index: true })
  @ApiPropertyOptional()
  appleId?: string;

  @ApiPropertyOptional()
  @Prop({
    required: true,
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.CUSTOMER,
  })
  role: USER_ROLES;

  @Prop({ select: false })
  @ApiPropertyOptional()
  verifyEmailToken?: string;

  @Prop({ select: false })
  @ApiPropertyOptional()
  verifyEmailExpire?: Date;

  @Prop({ select: false })
  @ApiPropertyOptional()
  resetPasswordToken?: string;

  @Prop({ select: false })
  @ApiPropertyOptional()
  resetPassworxwxwwxxdExpire?: Date;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserSchema = SchemaFactory.createForClass(User);
