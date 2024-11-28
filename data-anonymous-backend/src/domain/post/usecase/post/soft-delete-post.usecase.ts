import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';

@Injectable()
export class SoftDeletePostUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(postId: number) {
    return await this._postService.softDelete(postId);
  }
}
