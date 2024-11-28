import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';
import { UpdatePostDto } from '../../dto';

@Injectable()
export class UpdatePostUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(postId: number, updatePostDto: UpdatePostDto) {
    return await this._postService.updatePost(postId, updatePostDto);
  }
}
