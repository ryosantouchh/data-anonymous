import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { Category, Comment, Post } from './entities';
import { CategoryService, PostService } from './services';
import {
  CreateCategoryUsecase,
  CreatePostUsecase,
  FindAllCategoryUsecase,
  FindAllPostUsecase,
  FindCategoryByIdUsecase,
  FindPostByIdUsecase,
  SoftDeletePostUsecase,
  UpdatePostUsecase,
} from './usecase';
import { CategoryController } from './controllers';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    JwtModule,
    UserModule,
  ],
  controllers: [CategoryController, PostController],
  providers: [
    JwtService,
    PostService,
    CategoryService,

    CreateCategoryUsecase,
    FindAllCategoryUsecase,
    FindCategoryByIdUsecase,

    CreatePostUsecase,
    FindAllPostUsecase,
    FindPostByIdUsecase,
    SoftDeletePostUsecase,
    UpdatePostUsecase,
  ],
  exports: [PostService, CategoryService],
})
export class PostModule {}
