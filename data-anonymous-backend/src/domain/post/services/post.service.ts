import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import {
  DEFAULT_ITEM_PER_PAGE,
  DEFAULT_PAGE,
  generatePagination,
  getPaginationValue,
} from '@app/common/utils';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { UserService } from '@app/domain/user/services';
import { CategoryService } from './category.service';
import { FindAllPostDto } from '../dto/post/find-all-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private _postRepository: Repository<Post>,

    private _userService: UserService,
    private _categoryService: CategoryService,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    try {
      const { userId, categoryId } = createPostDto;

      const [user, category] = await Promise.all([
        this._userService.findOne(userId),
        this._categoryService.findOne(categoryId),
      ]);

      const newPost = this._postRepository.create(createPostDto);
      newPost.category = category;
      newPost.user = user;

      const createdPost = await this._postRepository.save(newPost);

      return createdPost;
    } catch (error) {
      throw error;
    }
  }

  async findAll({
    page,
    pageSize,
    userId,
    categoryId,
  }: {
    page?: number;
    pageSize?: number;
    userId?: number;
    categoryId?: number;
  }) {
    try {
      const { skip, take } = getPaginationValue({
        page: page || DEFAULT_PAGE,
        pageSize: pageSize || DEFAULT_ITEM_PER_PAGE,
      });

      const qb = this.initQueryBuilder()
        .leftJoin('post.comments', 'comment')
        .addSelect(['comment.id'])
        .andWhere('post.deletedAt IS NULL')
        .orderBy('post.id', 'DESC')
        .skip(skip)
        .take(take);

      if (userId) {
        qb.andWhere('post.user = :userId', { userId });
      }

      if (categoryId) {
        qb.andWhere('post.category = :categoryId', { categoryId });
      }

      const [posts, totalCounts] = await qb.getManyAndCount();

      // TODO : add this piece to the test
      posts.forEach((post) => {
        const commentCount = post.comments.length;
        delete post.comments;
        (post as FindAllPostDto).commentCount = commentCount;
      });

      return {
        data: posts,
        pagination: generatePagination({ totalCounts, skip, take }),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(postId: number) {
    try {
      const postById = await this.initQueryBuilder()
        .leftJoin('post.comments', 'comment')
        .leftJoin('comment.user', 'commentUser')
        .addSelect(['comment', 'commentUser'])
        .andWhere({ id: postId })
        .getOne();

      if (!postById) {
        throw new NotFoundException('post by id is not found');
      }

      return postById;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    try {
      const { user } = await this.findOne(postId);

      if (user.id !== updatePostDto.userId) {
        throw new ForbiddenException(
          'cannot update post since this post is not belong to user',
        );
      }

      await this._postRepository.update(postId, {
        content: updatePostDto.content,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(postId: number, userId: number) {
    try {
      const { user } = await this.findOne(postId);

      if (user.id !== userId) {
        throw new ForbiddenException(
          'cannot soft delete post since this post is not belong to user',
        );
      }

      await this._postRepository.update(postId, { deletedAt: new Date() });

      return;
    } catch (error) {
      throw error;
    }
  }

  initQueryBuilder() {
    const qb = this._postRepository
      .createQueryBuilder('post')
      .leftJoin('post.category', 'category')
      .leftJoin('post.user', 'user')
      .select(['post', 'category', 'user']);

    return qb;
  }
}
