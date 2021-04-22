import { ApiProperty } from '@nestjs/swagger';

import { Cat } from '../schemas/cat.entity';

export class CatPagingDto {
  @ApiProperty({
    type: [Cat],
  })
  data: Cat[];

  @ApiProperty()
  total: number;
}
