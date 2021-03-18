import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CatsService } from './cats.service';
import { CatDto, CreateCatDto, UpdateCatDto } from './dto';

@Controller('admin/cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly _catsService: CatsService) {}

  @Post()
  @ApiOkResponse({
    type: CatDto,
    description: 'Cat',
  })
  createOne(@Body() createCatDto: CreateCatDto) {
    return this._catsService.createOne(createCatDto);
  }

  @Get()
  findAll() {
    return this._catsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CatDto,
    description: 'Cat',
  })
  findOne(@Param('id') id: string) {
    return this._catsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: CatDto,
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
