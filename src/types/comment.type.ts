import { IPost } from './postData.type';
import { IUser } from './userData.type';

export interface IComment {
  _id: string;
  post: IPost;
  user: IUser;
  comment: string;
  isDeleted?: boolean;
  createdAt?: string;
}
