import { combineReducers } from "@reduxjs/toolkit";
import loader from "./loaderReducer";
import currentMonthTransactions from "./transactionsReduser";
import categories from "./categoriesReducer";

export const rootReducer = combineReducers({
  loader,
  transactions: currentMonthTransactions,
  categories
});
