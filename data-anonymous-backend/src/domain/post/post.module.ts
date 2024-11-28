import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { Category, Comment, Post } from './entities';
import { CategoryService, PostService } from './services';
import {
  CreateCategoryUsecase,
  FindAllCategoryUsecase,
  FindCategoryByIdUsecase,
} from './usecase';
import { CategoryController } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    JwtModule,
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [
    JwtService,
    PostService,
    CategoryService,

    CreateCategoryUsecase,
    FindAllCategoryUsecase,
    FindCategoryByIdUsecase,
  ],
  exports: [PostService, CategoryService],
})
export class PostModule {}
