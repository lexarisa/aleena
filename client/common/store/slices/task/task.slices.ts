import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../index.store';

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

        updateTasks: (state, action: PayloadAction<any>) => {
            const oldTasks = state.allTasks.filter((task: any) => {
                task.id !== action.payload.id
            });
            state.allTasks = [...oldTasks, action.payload];
        },

        createTask: (state, action) => {
            state.allTasks = [...state.allTasks, action.payload]
        },

        deleteTask: (state, action) => {
            state.allTasks = state.allTasks.filter((task: any) => task.id !== action.payload.id)
        },

        setCurrentTask: (state, action) => {
            state.currentTask = action.payload
        },
    },
    extraReducers: {
    }
})

export const { setTasks, updateTasks, deleteTask  } = TaskSlice.actions;

export const selectTask = (state: AppState) => state.task;

export default TaskSlice.reducer;