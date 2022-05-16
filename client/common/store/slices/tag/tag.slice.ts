import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const TagSlice = createSlice({
    name: 'tag',

    initialState: {
        tags: [] as any,
    },
    
    reducers: {

        setTags: (state, action: PayloadAction<any>) => {
            state.tags = action.payload;
        },

        updateTags: (state, action: PayloadAction<any>) => {
            const oldTags = state.tags.filter((tag: any) => {
                tag.id !== action.payload.id
            });
            state.tags = [...oldTags, action.payload];
        },

        createTag: (state, action) => {
            state.tags = [...state.tags, action.payload]
        },

        deleteTag: (state, action) => {
            state.tags = state.tags.filter((tag: any) => tag.id !== action.payload.id)
        },
    },
    extraReducers: {}
})

export const { setTags, createTag, updateTags, deleteTag } = TagSlice.actions;

export const selectTag = (state: RootState) => state.tag;

export default TagSlice.reducer;