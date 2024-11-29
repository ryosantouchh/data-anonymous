import { Injectable } from '@nestjs/common';
import { CommentService } from '../../services';

@Injectable()
export class FindCommentByIdUsecase {
  constructor(private readonly _commentService: CommentService) {}

  async execute(commentId: number) {
    return await this._commentService.findOne(commentId);
  }
}
