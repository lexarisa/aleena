import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';


import projectReducer from './slices/Projects/project.slices';
import milestoneReducer from './slices/Projects/project.slices';
import userReducer from './slices/User/user.slices';
import taskReducer from './slices/Tasks/tasks.slices';


const aleenaStore = () => configureStore({
    reducer: {
        project: projectReducer,
        milestone: milestoneReducer,
        user: userReducer,
        task: taskReducer,
    },
    devTools: true
});


export type AppStore = ReturnType<typeof aleenaStore>;
export type AppState = AppStore['getState'];
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>


export const wrapper = createWrapper<AppStore>(aleenaStore)

