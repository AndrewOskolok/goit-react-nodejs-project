import { createReducer } from "@reduxjs/toolkit";
import transactionActions from "../actions/categoriesActions.js";

const initialState = [];

const categories = createReducer(initialState, {  
  [transactionActions.getCategories]: (_, { payload }) => payload,
});

export default categories;
