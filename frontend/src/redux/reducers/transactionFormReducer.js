import { createReducer } from "@reduxjs/toolkit";
import transactionActions from "../actions/transactionFormActions.js";

const initialState = [];

const categories = createReducer(initialState, {  
  [transactionActions.getCategories]: (_, { payload }) => payload,
});

export default categories;
