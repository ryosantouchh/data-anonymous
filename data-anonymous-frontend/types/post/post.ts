export type TPost = {
  id: number;
  title: string;
  content: string;
  commentCount: number;
};

export type TPostData = {
  id: number;
  title: string;
  content: string;

  commentCount?: number;

  category: TCategory;
  user: TUser;
  comments: Array<TComment>;
};

export type TUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TComment = {
  id: number;
  content: string;

  user: TUser;
};
