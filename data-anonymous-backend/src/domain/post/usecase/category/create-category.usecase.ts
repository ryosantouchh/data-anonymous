import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../services';
import { CreateCategoryDto } from '../../dto';

@Injectable()
export class CreateCategoryUsecase {
  constructor(private readonly _categoryService: CategoryService) {}

  async execute(createCategoryDto: CreateCategoryDto) {
    return await this._categoryService.create(createCategoryDto);
  }
}
