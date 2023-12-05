import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { expenseReducer, handleErrorAndLoadingReducer } from '../reducer';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  errorHandling: handleErrorAndLoadingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
