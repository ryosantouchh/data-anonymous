import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterUserDto } from '../dto';
import { BaseHttpResponse, HttpResponse } from '@app/common/dto';
import {
  FindUserByIdUsecase,
  LoginUsecase,
  RegisterUserUsecase,
} from '../usecase';
import { JwtAuthGuard } from '../guards';

@Controller('user')
export class UserController {
  constructor(
    private registerUserUsecase: RegisterUserUsecase,
    private findUserByIdUsecase: FindUserByIdUsecase,
    private loginUsecase: LoginUsecase,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.registerUserUsecase.execute(registerUserDto);

    return new BaseHttpResponse({
      statusCode: HttpStatus.CREATED,
      message: 'register successfully',
    });
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('userId') userId: string) {
    const userById = await this.findUserByIdUsecase.execute(+userId);

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'find user by id successfully',
      data: userById,
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.loginUsecase.execute(loginDto);

    return new HttpResponse({
      statusCode: HttpStatus.OK,
      message: 'login successfully',
      data,
    });
  }
}
