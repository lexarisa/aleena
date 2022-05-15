import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from '../../pages/api/commentApi';

export const getCommentsApi = createAsyncThunk(
  'comment/getComments',
  async () => {
    getComments();
  }
);

export const deleteCommentApi = createAsyncThunk(
  'comment/deleteComment',
  async (id: number) => {
    deleteComment(id);
  }
);

export const updateCommentApi = createAsyncThunk(
  'comment/updateComment',
  async (id: number, newComment: any) => {
    updateComment(id, newComment);
  }
);

export const addCommentApi = createAsyncThunk(
  'comment/addComment',
  async (comment: any) => {
    addComment(comment);
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState: { comment: [] as any, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsApi.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(getCommentsApi.pending, (state, action) => {
        state.comment = false;
      })
      .addCase(updateCommentApi.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(updateCommentApi.pending, (state, action) => {
        state.comment = false;
      })
      .addCase(deleteCommentApi.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(updateCommentApi.pending, (state, action) => {
        state.comment = false;
      })
      .addCase(addCommentApi.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(addCommentApi.pending, (state, action) => {
        state.comment = false;
      });
  },
});

export default commentSlice.reducer;
export const {} = commentSlice.actions;
