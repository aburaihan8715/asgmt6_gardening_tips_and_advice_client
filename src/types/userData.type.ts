export interface IUser {
  username: string;
  email: string;
  password?: string;
  passwordChangedAt?: Date;
  profilePicture?: string;
  followers: string[];
  following: string[];
  verified: boolean;
  role: 'USER' | 'ADMIN' | 'VERIFIED_USER';
  favourites: string[];
}
