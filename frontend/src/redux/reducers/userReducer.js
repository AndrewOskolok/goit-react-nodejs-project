import { createReducer } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";
import {editBalanceOnAdd, editBalanceOnEdit} from "../actions/transactionFormActions";

const initialState = null;

export default createReducer(initialState, {
  [getUser]: (_, { payload }) => payload,
  [editBalanceOnAdd]: (state, { payload }) => {    
    return { ...state, currentBalance: payload };
  },
  [editBalanceOnEdit]: (state, { payload }) => {   
    return { ...state, currentBalance: payload };
  },
});
