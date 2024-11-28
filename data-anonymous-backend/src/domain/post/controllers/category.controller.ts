import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseHttpResponse, HttpResponse } from '@app/common/dto';
import { CreateCategoryDto } from '../dto';
import {
  CreateCategoryUsecase,
  FindAllCategoryUsecase,
  FindCategoryByIdUsecase,
} from '../usecase';
import { JwtAuthGuard } from '@app/domain/user/guards';

@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryUsecase: CreateCategoryUsecase,
    private findAllCategoryUsecase: FindAllCategoryUsecase,
    private findCategoryByIdUsecase: FindCategoryByIdUsecase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.createCategoryUsecase.execute(createCategoryDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.CREATED,
      message: 'create category successfully',
    });
  }

  @Get(':categoryId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('categoryId') categoryId: string) {
    const categoryById =
      await this.findCategoryByIdUsecase.execute(+categoryId);

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find category by id successfully',
      data: categoryById,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const categories = await this.findAllCategoryUsecase.execute();

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find categories successfully',
      data: categories,
    });
  }
}
