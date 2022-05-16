import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const CommentSlice = createSlice({
    name: 'comment',

    initialState: {
        comments: [] as any,
    },
    
    reducers: {

        setComments: (state, action: PayloadAction<any>) => {
            state.comments = action.payload;
        },

        updateComments: (state, action: PayloadAction<any>) => {
            const oldComments = state.comments.filter((comment: any) => {
                comment.id !== action.payload.id
            });
            state.comments = [...oldComments, action.payload];
        },

        createComment: (state, action) => {
            state.comments = [...state.comments, action.payload]
        },

        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comment: any) => comment.id !== action.payload.id)
        },
    },
    extraReducers: {}
})

export const { setComments, updateComments, createComment, deleteComment } = CommentSlice.actions;

export const selectComment = (state: RootState) => state.comment;

export default CommentSlice.reducer;