import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  categoryId: number;

  userId?: number;
}
