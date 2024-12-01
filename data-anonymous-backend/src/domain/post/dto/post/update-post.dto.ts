import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsPositive()
  categoryId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  userId?: number;
}
