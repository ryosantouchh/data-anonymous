import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import { generatePagination, getPaginationValue } from '@app/common/utils';
import { CreatePostDto, UpdatePostDto } from '../dto';
import { UserService } from '@app/domain/user/services';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private _postRepository: Repository<Post>,

    private _userService: UserService,
    // private _categoryService: CategoryService,
  ) { }

  async createPost(createPostDto: CreatePostDto) {
    try {
      const { categoryId } = createPostDto;
      // TODO : find one cat here

      const newPost = this._postRepository.create(createPostDto);
      // newPost.category = category
      // newPost.user = user
      //
      const { id: postId } = await this._postRepository.save(newPost);

      return postId;
    } catch (error) {
      throw error;
    }
  }

  async findAll({ page, pageSize }: { page: number; pageSize: number }) {
    try {
      const { skip, take } = getPaginationValue({
        ...(page ? { page } : {}),
        ...(pageSize ? { pageSize } : {}),
      });

      const [posts, totalCounts] = await this.initQueryBuilder()
        .andWhere('post.deletedAt IS NULL')
        .orderBy('post.id', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();

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
      await this.findOne(postId);
      await this._postRepository.update(postId, {
        content: updatePostDto.content,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(postId: number) {
    try {
      await this.findOne(postId);
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
      .select(['post', 'category']);

    return qb;
  }
}
