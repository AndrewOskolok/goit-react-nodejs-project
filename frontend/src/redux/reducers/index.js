import { combineReducers } from '@reduxjs/toolkit';
import { error } from "./errorReducer";
import loader from './loaderReducer';
import user from "./userReducer";
import currentMonthTransactions from './transactionsReduser';
import categories from './transactionFormReducer';
import statistics from './statisticReducer';
export const rootReducer = combineReducers({
  loader,
  user,
  transactions: currentMonthTransactions,
  categories,
  statistics,
  error
});
