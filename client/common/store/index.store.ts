import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';


import taskReducer from './slices/task/task.slices';
import milestoneReducer from './slices/milestone/milestone.slice';
import projectReducer from './slices/projects/project.slice';
import documentationReducer from './slices/documentation/documentation.slice';
import feedReducer from './slices/feed/feed.slice';
import prReducer from './slices/pr/pr.slice';


const aleenaStore = () => configureStore({
    reducer: {
        task: taskReducer,
        milestone: milestoneReducer,
        project: projectReducer,
        feed: feedReducer,
        pr: prReducer,
        documentation: documentationReducer,
    },
    devTools: true
});


export type AppStore = ReturnType<typeof aleenaStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>


export const wrapper = createWrapper<AppStore>(aleenaStore)