import { Injectable } from '@nestjs/common';
import { CommentService } from '../../services';

@Injectable()
export class SoftDeleteCommnetUsecase {
  constructor(private readonly _commentService: CommentService) {}

  async execute(commentId: number, userId: number) {
    return await this._commentService.softDelete(commentId, userId);
  }
}
