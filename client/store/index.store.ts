import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';

import projectReducer from './slices/project.slices';
import milestoneReducer from './slices/project.slices';
import userReducer from './slices/user.slices';
import taskReducer from './slices/tasks.slices';

const aleenaStore = () => configureStore({
    reducer: {
        project: projectReducer,
        milestone: milestoneReducer,
        user: userReducer,
        task: taskReducer,
    },
    devTools: true
})

export type AppStore = ReturnType<typeof aleenaStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(aleenaStore)

