import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = this._categoryRepository.create(createCategoryDto);

      await this._categoryRepository.save(newCategory);

      return;
    } catch (error) {
      throw error;
    }
  }

  async findOne(categoryId: number) {
    try {
      const categoryById = await this._categoryRepository.findOneBy({
        id: categoryId,
      });

      if (!categoryById) {
        throw new NotFoundException('category by id is not found');
      }

      return categoryById;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await this._categoryRepository.find({
        where: { deletedAt: null },
      });

      return categories;
    } catch (error) {
      throw error;
    }
  }
}
