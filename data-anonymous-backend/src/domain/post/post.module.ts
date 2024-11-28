import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { Category, Comment, Post } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    JwtModule,
    UserModule,
  ],
  controllers: [],
  providers: [JwtService],
  exports: [],
})
export class PostModule { }
