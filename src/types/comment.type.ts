import { IPost } from './post.type';
import { IUser } from './user.type';

export interface IComment {
  _id: string;
  post: IPost;
  user: IUser;
  comment: string;
  isDeleted?: boolean;
  createdAt?: string;
}
