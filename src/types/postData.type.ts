import { IUser } from './userData.type';

export interface IPost {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  content: string;
  category: 'Vegetables' | 'Flowers' | 'Landscaping' | 'Others';
  image: string;
  isPremium: boolean;
  isDeleted: boolean;
  numberOfComments: number;
  upvotes: string[];
  upvotesCount: number;
  downvotes: string[];
  downvotesCount: number;
  createdAt: Date;
}
