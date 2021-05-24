import { ApiProperty } from '@nestjs/swagger';

import { User } from '../schemas/user.entity';

export class UserPagingDto {
  @ApiProperty({
    type: [User],
  })
  data: User[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;
}
