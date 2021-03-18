import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from './../../common/BaseService';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat, CatDocument } from './schemas/cat.entity';

@Injectable()
export class CatsService extends BaseService<Cat, CreateCatDto, UpdateCatDto> {
  constructor(@InjectModel(Cat.name) _model: Model<CatDocument>) {
    super();
  }
}
