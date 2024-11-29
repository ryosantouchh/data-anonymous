import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  postId: number;

  userId?: number;
}
