import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { Category, Comment, Post } from './entities';
import { CategoryService, CommentService, PostService } from './services';
import {
  CreateCategoryUsecase,
  CreatePostUsecase,
  FindAllCategoryUsecase,
  FindAllPostByUserUsecase,
  FindAllPostUsecase,
  FindCategoryByIdUsecase,
  FindPostByIdUsecase,
  SoftDeletePostUsecase,
  UpdatePostUsecase,
} from './usecase';
import { CategoryController } from './controllers';
import { PostController } from './controllers/post.controller';
import {
  CreateCommentUsecase,
  FindCommentByIdUsecase,
  SoftDeleteCommnetUsecase,
  UpdateCommentUsecase,
} from './usecase/comment';
import { CommentController } from './controllers/comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    JwtModule,
    UserModule,
  ],
  controllers: [CategoryController, PostController, CommentController],
  providers: [
    JwtService,
    PostService,
    CategoryService,
    CommentService,

    CreateCategoryUsecase,
    FindAllCategoryUsecase,
    FindCategoryByIdUsecase,

    CreatePostUsecase,
    FindAllPostUsecase,
    FindPostByIdUsecase,
    FindAllPostByUserUsecase,
    SoftDeletePostUsecase,
    UpdatePostUsecase,

    CreateCommentUsecase,
    FindCommentByIdUsecase,
    UpdateCommentUsecase,
    SoftDeleteCommnetUsecase,
  ],
  exports: [PostService, CategoryService, CommentService],
})
export class PostModule {}
