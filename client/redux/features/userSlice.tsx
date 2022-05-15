import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () => {});

export const updateUser = createAsyncThunk(
  'user/updateUse',
  async (id: number, updateInfo: any) => {}
);

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: [] as any, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
