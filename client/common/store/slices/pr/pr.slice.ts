import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const PRSlice = createSlice({
    name: 'feed',

    initialState: {
        pr: [] as any,
    },
    
    reducers: {

        setPR: (state, action: PayloadAction<any>) => {
            state.pr = action.payload;
        },
    },
    extraReducers: {
    }
})

export const { setPR } = PRSlice.actions;

export const selectPR = (state: RootState) => state.pr;

export default PRSlice.reducer;