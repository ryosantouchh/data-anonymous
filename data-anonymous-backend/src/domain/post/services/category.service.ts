import { Injectable } from '@nestjs/common';
import { Category } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoryRepository: Repository<Category>,
  ) { }

  async create() {
    try {
    } catch (error) {
      throw error;
    }
  }

  async findOne() {
    try {
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
    } catch (error) {
      throw error;
    }
  }
}
