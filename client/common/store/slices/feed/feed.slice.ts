import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';

export const FeedSlice = createSlice({
    name: 'feed',

    initialState: {
        feed: [] as any,
    },
    
    reducers: {
        
        setFeed: (state, action: PayloadAction<any>) => {
            state.feed = action.payload;
        },

        updateFeed: (state, action: PayloadAction<any>) => {
            state.feed = state.feed.filter((fd: any) => fd.id != action.payload.id)
            state.feed = [...state.feed, action.payload]
        },
        
    },
    extraReducers: {
    }
})

export const { setFeed, updateFeed } = FeedSlice.actions;

export const selectFeed = (state: AppState) => state.feed;

export default FeedSlice.reducer;