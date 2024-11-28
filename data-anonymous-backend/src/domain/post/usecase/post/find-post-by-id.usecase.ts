import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';

@Injectable()
export class FindPostByIdUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(postId: number) {
    return await this._postService.findOne(postId);
  }
}
