import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorators';

import { CatsService } from './cats.service';
import { CreateCatDto, CatPagingDto, UpdateCatDto } from './dto';
import { Cat } from './schemas/cat.entity';

@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly _catsService: CatsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Cat,
    description: 'Cat',
  })
  @Auth()
  createOne(@Body() createCatDto: CreateCatDto) {
    return this._catsService.createOne(createCatDto);
  }

  @Get()
  @ApiOkResponse({
    type: CatPagingDto,
    description: 'CatList',
  })
  findAll(): CatPagingDto {
    return this._catsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Cat,
    description: 'Cat',
  })
  findOne(@Param('id') id: string) {
    return this._catsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Cat,
    description: 'Cat',
  })
  updateOne(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this._catsService.updateOne(id, updateCatDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this._catsService.removeOne(id);
  }
}
