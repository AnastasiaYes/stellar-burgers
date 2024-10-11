import { configureStore } from '@reduxjs/toolkit';
import { combineSlices, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './slices/ingredientSlice';

import { userSlice } from './slices/userSlice';
import { feedSlice } from './slices/feedSlice';

const rootReducer = combineReducers({
  ingredientData: ingredientsSlice.reducer,
  // constructorBurger: constructorSlice.reducer,
  userData: userSlice.reducer,
  feedsData: feedSlice.reducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
