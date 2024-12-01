import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities';
import { CreateCommentDto, UpdateCommentDto } from '../dto';
import { UserService } from '@app/domain/user/services';
import { PostService } from './post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private _commentRepository: Repository<Comment>,

    private _userService: UserService,
    private _postService: PostService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    try {
      const { postId, userId } = createCommentDto;

      const [post, user] = await Promise.all([
        this._postService.findOne(postId),
        this._userService.findOne(userId),
      ]);

      const newComment = this._commentRepository.create(createCommentDto);
      newComment.post = post;
      newComment.user = user;

      const createdComment = await this._commentRepository.save(newComment);

      return createdComment;
    } catch (error) {
      throw error;
    }
  }

  async findOne(commentId: number) {
    try {
      const commentById = await this.initQueryBuilder()
        .andWhere({ id: commentId })
        .getOne();

      if (!commentById) {
        throw new NotFoundException('comment by id is not found');
      }

      return commentById;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    try {
      const { user } = await this.findOne(commentId);

      if (user.id !== updateCommentDto.userId) {
        throw new ForbiddenException(
          'cannot update comment since this comment is not belong to user',
        );
      }

      await this._commentRepository.update(commentId, {
        content: updateCommentDto.content,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(commentId: number, userId: number) {
    try {
      const { user } = await this.findOne(commentId);

      if (user.id !== userId) {
        throw new ForbiddenException(
          'cannot delete comment since this comment is not belong to user',
        );
      }

      await this._commentRepository.update(commentId, {
        deletedAt: new Date(),
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  initQueryBuilder() {
    const qb = this._commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.post', 'post')
      .select(['comment', 'user', 'post.id', 'post.title']);

    return qb;
  }
}
