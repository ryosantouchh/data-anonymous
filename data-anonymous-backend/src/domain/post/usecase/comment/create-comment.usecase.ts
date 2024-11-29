import { Injectable } from '@nestjs/common';
import { CommentService } from '../../services';
import { CreateCommentDto } from '../../dto';

@Injectable()
export class CreateCommentUsecase {
  constructor(private readonly _commentService: CommentService) {}

  async execute(createCommentDto: CreateCommentDto) {
    return await this._commentService.createComment(createCommentDto);
  }
}
