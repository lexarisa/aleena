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
    },
    extraReducers: {
    }
})

export const { setFeed } = FeedSlice.actions;

export const selectFeed = (state: AppState) => state.feed;

export default FeedSlice.reducer;