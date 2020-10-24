import { createReducer } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";
import balanceAction from "../actions/categoriesActions.js";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (_, { payload }) => payload,
  [balanceAction.editCurrentBalance]: (state, { payload }) => {
    console.log("payload", payload);
    return { ...state, currentBalance: payload };
  },
  // [balanceAction.editTransaction]: (state, { payload }) => {
  //   const transactions = state.filter((item) => item.id !== payload.id);
  //   return [...transactions, payload];
  // },
});
