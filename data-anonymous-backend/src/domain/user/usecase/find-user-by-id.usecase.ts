import { Injectable } from '@nestjs/common';
import { UserService } from '../services';

@Injectable()
export class FindUserByIdUsecase {
  constructor(private readonly _userService: UserService) {}

  async execute(userId: number) {
    return await this._userService.findOne(userId);
  }
}
