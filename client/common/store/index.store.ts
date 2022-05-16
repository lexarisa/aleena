import { configureStore, ThunkAction, PreloadedState } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';


import prReducer from './slices/pr/pr.slice';
import userReducer from './slices/user/user.slice';
import taskReducer from './slices/task/task.slices';
import feedReducer from './slices/feed/feed.slice';
import projectReducer from './slices/projects/project.slice';
import milestoneReducer from './slices/milestone/milestone.slice';
import documentationReducer from './slices/documentation/documentation.slice';


const aleenaStore = () => configureStore({
    reducer: {
        pr: prReducer,
        user: userReducer,
        task: taskReducer,
        feed: feedReducer,
        project: projectReducer,
        milestone: milestoneReducer,
        documentation: documentationReducer,
    },
    devTools: true
});


export type AppStore = ReturnType<typeof aleenaStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>


export const wrapper = createWrapper<AppStore>(aleenaStore)