import { configureStore, ThunkAction, PreloadedState } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';
import { Action, Dispatch } from 'redux';
import prReducer from './slices/pr/pr.slice';
import tagReducer from './slices/tag/tag.slice';
import userReducer from './slices/user/user.slice';
import taskReducer from './slices/task/task.slices';
import feedReducer from './slices/feed/feed.slice';
import buttonReducer from './slices/buttons/buttons.slice';
import commentReducer from './slices/comment/comment';
import projectReducer from './slices/projects/project.slice';
import milestoneReducer from './slices/milestone/milestone.slice';
import documentationReducer from './slices/documentation/documentation.slice';
import articleReducer from './slices/article/article.slice';

const reducers = combineReducers({
  pr: prReducer,
  tag: tagReducer,
  user: userReducer,
  task: taskReducer,
  feed: feedReducer,
  button: buttonReducer,
  project: projectReducer,
  comment: commentReducer,
  milestone: milestoneReducer,
  documentation: documentationReducer,
  article: articleReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export const wrapper = createWrapper(store)

export const persistor = persistStore(store);
