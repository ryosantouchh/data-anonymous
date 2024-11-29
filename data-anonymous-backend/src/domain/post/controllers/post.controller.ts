import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { BaseHttpResponse, HttpResponse } from '@app/common/dto';
import { CreatePostDto, UpdatePostDto } from '../dto';
import {
  CreatePostUsecase,
  FindAllPostByUserUsecase,
  FindAllPostUsecase,
  FindPostByIdUsecase,
  SoftDeletePostUsecase,
  UpdatePostUsecase,
} from '../usecase';
import { JwtAuthGuard } from '@app/domain/user/guards';

@Controller('post')
export class PostController {
  constructor(
    private createPostUsecase: CreatePostUsecase,
    private findAllPostUsecase: FindAllPostUsecase,
    private findAllPostByUserUsecase: FindAllPostByUserUsecase,
    private findPostByIdUsecase: FindPostByIdUsecase,
    private updatePostUsecase: UpdatePostUsecase,
    private softDeletePostUsecase: SoftDeletePostUsecase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request()
    req: ExpressRequest & { userId: number },

    @Body() createPostDto: CreatePostDto,
  ) {
    createPostDto.userId = req.userId;
    await this.createPostUsecase.execute(createPostDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.CREATED,
      message: 'create post successfully',
    });
  }

  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('postId') postId: string) {
    const postById = await this.findPostByIdUsecase.execute(+postId);

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find post by id successfully',
      data: postById,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const posts = await this.findAllPostUsecase.execute({
      ...(page ? { page: +page } : {}),
      ...(pageSize ? { pageSize: +pageSize } : {}),
    });

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find posts successfully',
      ...posts,
    });
  }

  @Get('by/me')
  @UseGuards(JwtAuthGuard)
  async findAllByMe(
    @Request()
    req: ExpressRequest & { userId: number },

    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const posts = await this.findAllPostByUserUsecase.execute({
      userId: req.userId,
      ...(page ? { page: +page } : {}),
      ...(pageSize ? { pageSize: +pageSize } : {}),
    });

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find post by user successfully',
      ...posts,
    });
  }

  @Patch(':postId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,

    @Request()
    req: ExpressRequest & { userId: number },
  ) {
    updatePostDto.userId = req.userId;
    await this.updatePostUsecase.execute(+postId, updatePostDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'update post by id successfully',
    });
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  async softDelete(
    @Param('postId') postId: string,

    @Request()
    req: ExpressRequest & { userId: number },
  ) {
    await this.softDeletePostUsecase.execute(+postId, req.userId);

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'delete post by id successfully',
    });
  }
}
