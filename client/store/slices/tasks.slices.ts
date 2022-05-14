import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../index.store';


export const fetchTask = createAsyncThunk
('projects/fetchProjects', async () => {

    const res = await fetch(`${process.env.BASEURL}/project/`)
    .then((data) => data.json())

    return res.projects;
});

export const TaskSlice = createSlice({
    name: 'task',

    initialState: {
        id: null,

    },
    
    reducers: {

        getTask: (state, action ) => {},

        setTask: (state, action) => {
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

export const { setTask } = TaskSlice.actions;

export const selectTask = (state: AppState) => state.task;

export default TaskSlice.reducer;