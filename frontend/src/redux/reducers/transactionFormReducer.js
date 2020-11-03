import { createReducer } from "@reduxjs/toolkit";
import {getCategories} from "../actions/transactionFormActions.js";

const initialState = [];

const categories = createReducer(initialState, {  
  [getCategories]: (_, { payload }) => payload,
});

export default categories;
