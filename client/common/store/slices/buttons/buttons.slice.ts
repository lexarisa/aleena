import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const ButtonSlice = createSlice({
    name: 'button',

    initialState: {
        boardButton: false as boolean,
    },
    
    reducers: {
        
        setButton: (state, action: PayloadAction<any>) => {
            state.boardButton = action.payload;
        },
        
    },
    extraReducers: {
    }
})

export const { setButton} = ButtonSlice.actions;

export const selectButton = (state: RootState) => state.button;

export default ButtonSlice.reducer;