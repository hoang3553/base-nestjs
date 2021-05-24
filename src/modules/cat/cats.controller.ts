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
import { CatsService } from './cats.service';
import { CatPagingDto, CreateCatDto, QueryDto, UpdateCatDto } from './dto';
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
  createOne(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this._catsService.createOne(createCatDto);
  }

  @Get()
  @ApiOkResponse({
    type: CatPagingDto,
    description: 'CatList',
  })
  findAll(@Query() query: QueryDto): Promise<CatPagingDto> {
    return this._catsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Cat,
    description: 'Cat',
  })
  findOne(@Param('id') id: string): Promise<Cat> {
    return this._catsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Cat,
    description: 'Cat',
  })
  updateOne(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this._catsService.updateOne(id, updateCatDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string): Promise<string> {
    return this._catsService.removeOne(id);
  }
}
