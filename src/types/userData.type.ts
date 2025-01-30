export interface IUser {
  _id: string;
  username?: string | undefined;
  email: string;
  password?: string;
  passwordChangedAt?: Date;
  profilePicture?: string;
  followers?: string[];
  followersCount?: number;
  followings?: string[];
  followingsCount?: number;
  isVerified?: boolean;
  isDeleted?: boolean;
  role: 'user' | 'admin' | 'superAdmin';
  favourites?: string[];
}
