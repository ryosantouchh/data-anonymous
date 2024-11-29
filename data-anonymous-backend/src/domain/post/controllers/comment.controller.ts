import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { BaseHttpResponse, HttpResponse } from '@app/common/dto';
import { CreateCommentDto, UpdateCommentDto } from '../dto';
import {
  CreateCommentUsecase,
  FindCommentByIdUsecase,
  SoftDeleteCommnetUsecase,
  UpdateCommentUsecase,
} from '../usecase';
import { JwtAuthGuard } from '@app/domain/user/guards';

@Controller('comment')
export class CommentController {
  constructor(
    private createCommentUsecase: CreateCommentUsecase,
    private findCommentByIdUsecase: FindCommentByIdUsecase,
    private softDeleteCommnetUsecase: SoftDeleteCommnetUsecase,
    private updateCommentUsecase: UpdateCommentUsecase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request()
    req: ExpressRequest & { userId: number },

    @Body() createCommentDto: CreateCommentDto,
  ) {
    createCommentDto.userId = req.userId;
    await this.createCommentUsecase.execute(createCommentDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.CREATED,
      message: 'create comment successfully',
    });
  }

  @Get(':commentId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('commentId') commentId: string) {
    const commentById = await this.findCommentByIdUsecase.execute(+commentId);

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find comment by id successfully',
      data: commentById,
    });
  }

  @Patch(':commentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,

    @Request()
    req: ExpressRequest & { userId: number },
  ) {
    updateCommentDto.userId = req.userId;
    await this.updateCommentUsecase.execute(+commentId, updateCommentDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'update comment by id successfully',
    });
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  async softDelete(
    @Param('commentId') commentId: string,

    @Request()
    req: ExpressRequest & { userId: number },
  ) {
    await this.softDeleteCommnetUsecase.execute(+commentId, req.userId);

    return new BaseHttpResponse({
      statusCode: HttpStatus.OK,
      message: 'delete comment by id successfully',
    });
  }
}
