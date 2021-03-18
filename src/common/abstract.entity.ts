import { UtilsService } from '../providers/utils.service';
import { AbstractDto } from './dto/AbstractDto';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  // eslint-disable-next-line @typescript-eslint/tslint/config
  _id: string;

  createdAt: Date;

  updatedAt: Date;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any) {
    return UtilsService.toDto(this.dtoClass, this, options);
  }
}
