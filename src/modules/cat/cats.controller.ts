import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../decorators';
import { PageOptionsDto } from './../../common/dto/PageOptionsDto';
import { CatsService } from './cats.service';
import { CatPagingDto, CreateCatDto, UpdateCatDto } from './dto';
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
  findAll(@Query() query: PageOptionsDto): CatPagingDto {
    // console.log(JSON.parse(query.filter))
    return this._catsService.findAll(query);
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
