import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService, PostService } from '../services';
import {
  mockNewUserInstance,
  mockOneCategory,
  mockOnePost,
  mockOneUser,
  mockTwoPost,
} from '@app/common/mocks';
import { UserService } from '@app/domain/user/services';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('PostService', () => {
  let postService: PostService;
  let userService: UserService;
  let categoryService: CategoryService;
  let postRepository: any;
  let userRepository: any;
  let categoryRepository: any;

  beforeEach(async () => {
    postRepository = {
      find: jest.fn().mockResolvedValue([mockOnePost, mockTwoPost]),
      findOne: jest.fn().mockResolvedValue(mockOnePost),
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
        PostService,
        UserService,
        CategoryService,
        JwtService,
        ConfigService,
        { provide: 'PostRepository', useValue: postRepository },
        { provide: 'UserRepository', useValue: userRepository },
        { provide: 'CategoryRepository', useValue: categoryRepository },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('create post', () => {
    const mockCreatePostDto = {
      title: 'title',
      content: 'content',
      categoryId: 1,
      userId: 1,
    };

    it('should create a post successfully', async () => {
      postService.findOne = jest.fn().mockResolvedValue({ user: { id: 1 } });
      userService.findOne = jest.fn().mockResolvedValue(mockOneUser);
      categoryService.findOne = jest.fn().mockResolvedValue(mockOneCategory);

      postRepository.create = jest.fn().mockResolvedValue(mockNewUserInstance);
      postRepository.save = jest.fn().mockResolvedValue(mockOnePost);

      await postService.createPost(mockCreatePostDto);
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        userService.findOne = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await postService.createPost(mockCreatePostDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findAll', () => {
    it('should return an arrays of posts', async () => {
      postService.countCommentForPost = jest.fn().mockReturnValue(true);
      postService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          leftJoin: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getManyAndCount: jest
            .fn()
            .mockResolvedValue([[mockOnePost, mockTwoPost], 2]),
        };
      });
      await postService.findAll({});
    });

    it('should return an arrays of posts by user_id', async () => {
      postService.countCommentForPost = jest.fn().mockReturnValue(true);
      postService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          leftJoin: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getManyAndCount: jest
            .fn()
            .mockResolvedValue([[mockOnePost, mockTwoPost], 2]),
        };
      });
      await postService.findAll({ userId: 1 });
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        postService.countCommentForPost = jest.fn().mockReturnValue(true);
        postService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getManyAndCount: jest
              .fn()
              .mockRejectedValueOnce(
                new InternalServerErrorException('failed'),
              ),
          };
        });

        await postService.findAll({});
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findOne', () => {
    it('should return a post by id', async () => {
      postService.initQueryBuilder = jest.fn().mockImplementation(() => {
        return {
          andWhere: jest.fn().mockReturnThis(),
          leftJoin: jest.fn().mockReturnThis(),
          addSelect: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          take: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValue(mockOnePost),
        };
      });
      await postService.findOne(1);
    });

    it('should throw not found error if post does not exist', async () => {
      try {
        postService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            take: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(false),
          };
        });

        await postService.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        postService.initQueryBuilder = jest.fn().mockImplementation(() => {
          return {
            andWhere: jest.fn().mockReturnThis(),
            leftJoin: jest.fn().mockReturnThis(),
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

        await postService.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update post', () => {
    const mockUpdatePostDto = { content: 'content', userId: 1 };

    it('should update a post by id successfully', async () => {
      postService.findOne = jest.fn().mockResolvedValue({ user: { id: 1 } });

      await postService.updatePost(1, mockUpdatePostDto);
    });

    it('should throw forbidden error if post does not belong to user', async () => {
      try {
        postService.findOne = jest.fn().mockResolvedValue({ user: { id: 2 } });

        await postService.updatePost(1, mockUpdatePostDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        postService.findOne = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await postService.updatePost(1, mockUpdatePostDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('soft delete post', () => {
    it('should soft delete a post by id successfully', async () => {
      postService.findOne = jest.fn().mockResolvedValue({ user: { id: 1 } });

      await postService.softDelete(1, 1);
    });

    it('should throw forbidden error if post does not belong to user', async () => {
      try {
        postService.findOne = jest.fn().mockResolvedValue({ user: { id: 2 } });

        await postService.softDelete(1, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });

    it('should throw error if unexpected error occurs', async () => {
      try {
        postService.findOne = jest
          .fn()
          .mockRejectedValueOnce(new InternalServerErrorException('failed'));

        await postService.softDelete(1, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
