import { createReducer } from "@reduxjs/toolkit";
import transactionActions from "../actions/transactionActions.js";

const initialState = {};

const transaction = createReducer(initialState, {
  [transactionActions.addTransaction]: (state, {payload}) => [...state, payload],
  [transactionActions.getCategories]: (_, {payload}) => payload,
})
