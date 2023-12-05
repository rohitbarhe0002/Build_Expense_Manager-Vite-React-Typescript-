import { configureStore } from '@reduxjs/toolkit';

import {expenseReducer} from '../reducer';
const store = configureStore({
  reducer: expenseReducer,

});

export default store;

