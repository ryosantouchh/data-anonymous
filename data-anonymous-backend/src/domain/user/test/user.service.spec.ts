import { Test, TestingModule } from '@nestjs/testing';
import { mockNewUserInstance, mockOneUser } from '@app/common/mocks';
import { UserService } from '@app/domain/user/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let jwtService: JwtService;
  let userRepository: any;

  beforeEach(async () => {
    userRepository = {
      find: jest.fn().mockResolvedValue([mockOneUser]),
      findOne: jest.fn().mockResolvedValue(mockOneUser),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      createQueryBuilder: jest.fn().mockImplementation(() => {
        return {
          leftJoin: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getManyAndCount: jest.fn().mockReturnThis(),
          select: jest.fn().mockImplementation(() => {
            return {
              getManyAndCount: jest.fn().mockReturnThis(),
            };
          }),
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        ConfigService,
        { provide: 'UserRepository', useValue: userRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register user', () => {
    const mockRegisterDto = {
      username: 'username',
      password: '1234',
    };

    it('should register successfully', async () => {
      userService.findOneByUsername = jest.fn().mockResolvedValue(false);

      userService.hashPassword = jest.fn().mockResolvedValue('hashedPassword');

      userRepository.create = jest.fn().mockResolvedValue(mockNewUserInstance);
      userRepository.save = jest.fn().mockResolvedValue(mockOneUser);

      await userService.register(mockRegisterDto);
    });

    it('should throw error if user by username is exist', async () => {
      try {
        userService.findOneByUsername = jest
          .fn()
          .mockResolvedValue({ user: { id: 1 } });

        await userService.register(mockRegisterDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.findOneByUsername = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await userService.register(mockRegisterDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('login user', () => {
    const mockLoginDto = {
      username: 'username',
      password: '1234',
    };

    it('should login successfully', async () => {
      jwtService.sign = jest.fn().mockResolvedValue('accessToken');
      userService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue(mockOneUser),
        };
      });

      userService.validateUser = jest.fn().mockResolvedValue(true);

      await userService.login(mockLoginDto);
    });

    it('should throw error if cannot validate user with their hash', async () => {
      try {
        jwtService.sign = jest.fn().mockResolvedValue('accessToken');
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(mockOneUser),
          };
        });

        userService.validateUser = jest.fn().mockResolvedValue(false);

        await userService.login(mockLoginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(mockOneUser),
          };
        });

        userService.validateUser = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await userService.login(mockLoginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('find user by username', () => {
    it('should return user by username', async () => {
      userService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue(mockOneUser),
        };
      });

      await userService.findOneByUsername('username');
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest
              .fn()
              .mockRejectedValueOnce(
                new InternalServerErrorException('failed'),
              ),
          };
        });

        await userService.findOneByUsername('username');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('find user by id', () => {
    it('should return user by id', async () => {
      userService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue(mockOneUser),
        };
      });

      await userService.findOne(1);
    });

    it('should throw not found error if user by id is not exist', async () => {
      try {
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(null),
          };
        });

        await userService.findOne(1, true);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest
              .fn()
              .mockRejectedValueOnce(
                new InternalServerErrorException('failed'),
              ),
          };
        });

        await userService.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('find all users', () => {
    it('should return an array of users', async () => {
      userService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockResolvedValue([mockOneUser]),
        };
      });

      await userService.findAll();
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getMany: jest
              .fn()
              .mockRejectedValueOnce(
                new InternalServerErrorException('failed'),
              ),
          };
        });

        await userService.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update user', () => {
    const mockUpdateUserDto = {
      firstName: 'ever',
      lastName: 'greatest',
    };

    it('should update user by id successfully', async () => {
      userService.findOne = jest.fn().mockResolvedValue(true);

      await userService.update(1, mockUpdateUserDto);
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.findOne = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await userService.update(1, mockUpdateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('soft delete user', () => {
    it('should soft delete user by id successfully', async () => {
      userService.findOne = jest.fn().mockResolvedValue(true);

      await userService.softDelete(1);
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.findOne = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await userService.softDelete(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('init query builder', () => {
    it('should create query builder', async () => {
      userService.initQueryBuilder();
    });
  });
});
