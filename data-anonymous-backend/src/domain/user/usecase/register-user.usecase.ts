import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { RegisterUserDto } from '../dto';

@Injectable()
export class RegisterUserUsecase {
  constructor(private readonly _userService: UserService) {}

  async execute(registerUserDto: RegisterUserDto) {
    return await this._userService.register(registerUserDto);
  }
}
