import { Injectable } from '@nestjs/common';
import { UserService } from '../services';
import { LoginDto } from '../dto';

@Injectable()
export class LoginUsecase {
  constructor(private readonly _userService: UserService) {}

  async execute(loginDto: LoginDto) {
    return await this._userService.login(loginDto);
  }
}
