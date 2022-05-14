import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../index.store';


export const fetchUser = createAsyncThunk
('projects/fetchProjects', async () => {

    const res = await fetch(`${process.env.BASEURL}/project/`)
    .then((data) => data.json())

    return res.projects;
});

export const UserSlice = createSlice({
    name: 'user',

    initialState: {
        id: null,

    },
    
    reducers: {

        getUser: (state, action ) => {},

        setUser: (state, action) => {
            state  = action.payload
        } 

    },
    extraReducers: {
        // @ts-ignore
        [fetchUser.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

export const { setUser } = UserSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default UserSlice.reducer;