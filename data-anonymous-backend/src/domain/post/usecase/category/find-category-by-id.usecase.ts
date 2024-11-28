import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../services';

@Injectable()
export class FindCategoryByIdUsecase {
  constructor(private readonly _categoryService: CategoryService) {}

  async execute(categoryId: number) {
    return await this._categoryService.findOne(categoryId);
  }
}
