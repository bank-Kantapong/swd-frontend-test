import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import userInfoReducer from './userInfoSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    userInfo: userInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
