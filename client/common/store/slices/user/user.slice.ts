import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const UserSlice = createSlice({
  name: 'user',

  initialState: {
    id: 0,
    bookmarks: [] as any,
  },

  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.id = action.payload;
    },
    createBookmark: (state, action: PayloadAction<any>) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },

    setBookmarks: (state, action: PayloadAction<any>) => {
      state.bookmarks = action.payload;
    },
    deleteBookmark: (state, action: PayloadAction<any>) => {
      state.bookmarks = state.bookmarks.filter(
        (article_id: number) => article_id !== action.payload
      );
    },
    updateBookmarks: (state, action: PayloadAction<any>) => {
      const oldBookmarks = state.bookmarks.filter((article_id: any) => {
        console.log('action payload,articleID', action.payload, article_id);
        article_id !== action.payload;
      });
      state.bookmarks = [...oldBookmarks, action.payload];
    },
  },
  extraReducers: {},
});

export const {
  setUser,
  setBookmarks,
  createBookmark,
  updateBookmarks,
  deleteBookmark,
} = UserSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default UserSlice.reducer;
