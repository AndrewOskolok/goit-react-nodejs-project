import { combineReducers } from '@reduxjs/toolkit';
import loader from './loaderReducer';
import currentMonthTransactions from './transactionsReduser';
import categories from './categoriesReducer';
import statistics from './statisticReducer';
export const rootReducer = combineReducers({
  loader,
  transactions: currentMonthTransactions,
  categories,
  statistics,
});
