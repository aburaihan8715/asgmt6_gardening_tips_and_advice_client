import { RootState } from '@/redux/store';
import { IUser } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  user: null | IUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const getCurrentToken = (state: RootState) => state.auth.token;
export const getCurrentUser = (state: RootState) => state.auth.user;
