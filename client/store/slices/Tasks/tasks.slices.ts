import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';
import { fetchTasks } from './tasks.api';


export const TaskSlice = createSlice({
    name: 'task',

    initialState: {
        allTasks: [] as any,
        allTasksMilestone: [] as any,
        currentTask: null,
    },
    
    reducers: {

        setTasks: (state, action: PayloadAction<any>) => {
            state.allTasks = action.payload;
        },

        setSseTasks: (state, action: PayloadAction<any>) => {
            const oldTasks = state.allTasks.filter((task: any) => {
                task.id !== action.payload.id
            });
            state.allTasks = [...oldTasks, action.payload];
        },

        create: (state, action) => {
            state = action.payload
        },

        delete: (state, action) => {
            state = action.payload
        },

        addTeammate: (state, action) => {
            state = action.payload
        },

        deleteTeammate: (state, action) => {
            state = action.payload
        },

    
    },
    extraReducers: {
    //    @ts-ignore
        [fetchTasks.fulfilled]: (state, action) => {
            state.allTasks = action.payload;
        }
    }
})

export const { setSseTasks, setTasks } = TaskSlice.actions;

export const selectTask = (state: AppState) => state.task;

export default TaskSlice.reducer;