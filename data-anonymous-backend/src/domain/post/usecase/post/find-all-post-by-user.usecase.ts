import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';

@Injectable()
export class FindAllPostByUserUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(query: { page?: number; pageSize?: number; userId: number }) {
    return await this._postService.findAll(query);
  }
}
