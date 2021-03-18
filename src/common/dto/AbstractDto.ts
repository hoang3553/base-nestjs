import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiPropertyOptional()
  // eslint-disable-next-line @typescript-eslint/tslint/config
  _id: string;
  @ApiPropertyOptional()
  createdAt: Date;
  @ApiPropertyOptional()
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this._id = entity._id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
