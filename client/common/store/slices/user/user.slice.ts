import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const UserSlice = createSlice({
  name: 'user',

  initialState: {
    id: 0,
  },

  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.id = action.payload;
    },
  },
  extraReducers: {},
});

export const { setUser } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
