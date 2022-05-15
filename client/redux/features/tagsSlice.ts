import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTags, updateTag, deleteTag, addTag } from '../../pages/api/tagsApi';

export const getTagsApi = createAsyncThunk('tags/getTags', async () => {
  getTags();
});

export const updateTagsApi = createAsyncThunk(
  'tags/updateTags',
  async (id: number, newTagDetail: any) => {
    updateTag(id, newTagDetail);
  }
);

export const deleteTagsApi = createAsyncThunk(
  'tags/deleteTags',
  async (id: number) => {
    deleteTag(id);
  }
);

export const addTagsApi = createAsyncThunk(
  'tags/addTags',
  async (tags: any) => {
    addTag(tags);
  }
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: { tags: [] as any },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagsApi.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(updateTagsApi.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(deleteTagsApi.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(addTagsApi.fulfilled, (state, action) => {
        state.tags = action.payload;
      });
  },
});

export default tagsSlice.reducer;
export const {} = tagsSlice.actions;
