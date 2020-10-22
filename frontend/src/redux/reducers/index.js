import { combineReducers } from '@reduxjs/toolkit';
import loader from './loaderReducer';
import user from "./userReducer";
import currentMonthTransactions from './transactionsReduser';
import categories from './categoriesReducer';
import statistics from './statisticReducer';
export const rootReducer = combineReducers({
  loader,
  user,
  transactions: currentMonthTransactions,
  categories,
  statistics,
});
