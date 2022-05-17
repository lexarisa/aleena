import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index.store';

export const TaskSlice = createSlice({
    name: 'task',

    initialState: {
        allTasks: [] as any,
        allTasksMilestone: [] as any,
        currentTask: '',
    },
    
    reducers: {

        setTasks: (state, action: PayloadAction<any>) => {
            state.allTasks = action.payload;
        },

        updateTasks: (state, action: PayloadAction<any>) => {
            const oldTasks = state.allTasks.filter((task: any) => {
                return task.id !== action.payload.id
            });
            state.allTasks = [...oldTasks, action.payload];
        },

        createTask: (state, action) => {
            state.allTasks = [...state.allTasks, action.payload]
        },

        deleteTask: (state, action) => {
            state.allTasks = state.allTasks.filter((task: any) => {
                return task.id !== action.payload.id
            })
        },

        setCurrentTask: (state, action) => {
            state.currentTask = action.payload
        },
    },
    extraReducers: {
    }
})

export const { setTasks, createTask, updateTasks, deleteTask, setCurrentTask  } = TaskSlice.actions;

export const selectAllTasks = (state: RootState) => state.task.allTasks;

export default TaskSlice.reducer;