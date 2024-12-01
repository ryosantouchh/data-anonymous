import { Post } from '../../entities';

export class FindAllPostDto extends Post {
  commentCount: number;
}
