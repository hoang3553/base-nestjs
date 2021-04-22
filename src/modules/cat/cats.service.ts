import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from './../../common/BaseService';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat, CatDocument } from './schemas/cat.entity';

@Injectable()
export class CatsService extends BaseService<
  CatDocument,
  CreateCatDto,
  UpdateCatDto
> {
  constructor(
    @InjectModel(Cat.name) private readonly _catModel: Model<CatDocument>,
  ) {
    super(_catModel);
  }
}
