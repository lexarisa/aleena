import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';

export const UserSlice = createSlice({
    name: 'user',

    initialState: {
        id: 0,
    },
    
    reducers: {

        setUser: (state, action: PayloadAction<any>) => {
            state.id = action.payload;
        },
    },
    extraReducers: {
    }
})

export const { setUser } = UserSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default UserSlice.reducer;