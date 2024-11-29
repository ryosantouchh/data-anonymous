import { Injectable } from '@nestjs/common';
import { CommentService } from '../../services';
import { UpdateCommentDto } from '../../dto';

@Injectable()
export class UpdateCommentUsecase {
  constructor(private readonly _commentService: CommentService) {}

  async execute(commentId: number, updateCommentDto: UpdateCommentDto) {
    return await this._commentService.updateComment(
      commentId,
      updateCommentDto,
    );
  }
}
