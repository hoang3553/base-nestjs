import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png'];

    return _.includes(imageMimeTypes, mimeType);
  }
}
