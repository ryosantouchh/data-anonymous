import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { isNil } from 'lodash';

import { User } from '../entities';
import { RegisterUserDto, LoginDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  private _salt = 10; // HARD_CODE
  private _jwtSecret: string;

  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,

    private _jwtService: JwtService,
    private _configService: ConfigService,
  ) {
    this._jwtSecret = this._configService.get<string>('jwt.jwtSecret');
  }

  async register(registerUserDto: RegisterUserDto): Promise<number | null> {
    try {
      const { username, password } = registerUserDto;
      const user = await this.findOneByUsername(username);

      if (user) {
        throw new ConflictException('there is exist user with this username');
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = this._userRepository.create();
      newUser.username = username;
      newUser.password = hashedPassword;

      const { id: userId } = await this._userRepository.save(newUser);

      return userId;
    } catch (error) {
      throw error;
    }
  }

  async login({ username, password }: LoginDto) {
    try {
      const qb = this.initQueryBuilder()
        .andWhere('user.username = :username', { username })
        .addSelect(['user.password']);

      const user = await qb.getOne();

      if (isNil(user)) {
        throw new UnauthorizedException('wrong username or password');
      }

      const isValidated = await this.validateUser({
        password,
        hashedPassword: user.password,
      });

      if (!isValidated) {
        throw new UnauthorizedException('wrong username or password');
      }

      delete user.password;

      const payload = {
        id: user.id,
      };

      return {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
        accessToken: this._jwtService.sign(payload, {
          privateKey: this._jwtSecret,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async validateUser({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, await bcrypt.genSalt(this._salt));
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user = await this.initQueryBuilder()
        .andWhere('user.username = :username', { username })
        .getOne();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: number, errorByPass: boolean = false): Promise<User> {
    try {
      const user = await this.initQueryBuilder()
        .andWhere({ id: userId })
        .getOne();

      if (!user && !errorByPass) {
        throw new NotFoundException('user by id is not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Array<User>> {
    try {
      const users = await this.initQueryBuilder()
        .andWhere('user.deletedAt IS NULL')
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      await this.findOne(userId);

      const { firstName, lastName } = updateUserDto;

      await this._userRepository.update(userId, {
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  async softDelete(userId: number) {
    try {
      await this.findOne(userId);

      await this._userRepository.update(userId, {
        deletedAt: new Date(),
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  initQueryBuilder() {
    const qb = this._userRepository.createQueryBuilder('user');

    return qb;
  }
}
