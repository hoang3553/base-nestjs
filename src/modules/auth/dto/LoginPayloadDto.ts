import { ApiProperty } from '@nestjs/swagger';

import { User, UserDocument } from '../../user/schemas/user.entity';

export class LoginPayloadDto {
  @ApiProperty({ type: User })
  data: UserDocument;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  resetToken?: string;
  @ApiProperty()
  message: string;

  constructor(data: UserDocument, accessToken: string, resetToken: string) {
    this.data = data;
    this.accessToken = accessToken;
    this.resetToken = resetToken;
  }
}
