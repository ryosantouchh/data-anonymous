import { Injectable } from '@nestjs/common';
import { PostService } from '../../services';
import { CreatePostDto } from '../../dto';

@Injectable()
export class CreatePostUsecase {
  constructor(private readonly _postService: PostService) {}

  async execute(createPostDto: CreatePostDto) {
    return await this._postService.createPost(createPostDto);
  }
}
