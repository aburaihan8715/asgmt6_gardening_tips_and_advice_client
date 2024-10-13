export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  passwordChangedAt?: Date;
  profilePicture?: string;
  followers: string[];
  followersCount: number;
  followings: string[];
  followingCount: number;
  isVerified: boolean;
  isDeleted: boolean;
  role: 'USER' | 'ADMIN';
  favourites: string[];
}
