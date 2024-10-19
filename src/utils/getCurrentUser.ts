'use server';
import { jwtDecode } from 'jwt-decode';
// get current user

import { cookies } from 'next/headers';

// NOTE: it should not be included in the AuthActions
export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken._id,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
      profilePicture: decodedToken.profilePicture,
      isVerified: decodedToken.isVerified,
      isDeleted: decodedToken.isDeleted,
      followers: decodedToken.followers,
      followings: decodedToken.followings,
      followersCount: decodedToken.followersCount,
      followingsCount: decodedToken.followingsCount,
      favourites: decodedToken.favourites,
    };
  }

  return decodedToken;
};
