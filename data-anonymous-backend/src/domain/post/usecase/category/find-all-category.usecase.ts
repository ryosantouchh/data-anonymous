import { Injectable } from '@nestjs/common';
import { CategoryService } from '../../services';

@Injectable()
export class FindAllCategoryUsecase {
  constructor(private readonly _categoryService: CategoryService) {}

  async execute() {
    return await this._categoryService.findAll();
  }
}
