import { Category, Comment, Post } from '@app/domain/post/entities';
import { User } from '@app/domain/user/entities';
import { registerAs } from '@nestjs/config';

export const typeorm = registerAs('typeorm', () => ({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  database: 'data_anonymous_db',
  entities: [User, Post, Comment, Category],
  synchronize: false,
  timezone: 'Asia/Bangkok',
}));
