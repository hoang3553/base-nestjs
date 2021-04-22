import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/UserDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  resetToken: string;

  constructor(user: UserDto, accessToken: string, resetToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.resetToken = resetToken;
  }
}
