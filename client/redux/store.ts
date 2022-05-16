import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { projectSlice } from './features/projectSlice';
import { userSlice } from './features/userSlice';
import { tagsSlice } from './features/tagsSlice';
import { commentSlice } from './features/commentSlice';

// const createStore = (preloadedState: any) => {
//   return configureStore({
//     reducer: {
//       project: projectSlice.reducer,
//       user: userSlice.reducer,
//       tags: tagsSlice.reducer,
//       comment: commentSlice.reducer,
//     },
//     devTools: true,
//     preloadedState
//   })
// }
export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
    user: userSlice.reducer,
    tags: tagsSlice.reducer,
    comment: commentSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
