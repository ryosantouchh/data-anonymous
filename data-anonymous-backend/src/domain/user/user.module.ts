import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { UserController } from './controllers';
import { User } from './entities';
import {
  FindUserByIdUsecase,
  LoginUsecase,
  RegisterUserUsecase,
} from './usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,

    RegisterUserUsecase,
    FindUserByIdUsecase,
    LoginUsecase,
  ],
  exports: [UserService],
})
export class UserModule {}
