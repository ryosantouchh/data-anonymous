import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';

@Injectable()
export class FindAllPostUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(query: {
    page?: number;
    pageSize?: number;
    userId?: number;
    categoryId?: number;
  }) {
    return await this._postService.findAll(query);
  }
}
