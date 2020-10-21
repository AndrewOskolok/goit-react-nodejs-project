import { createAction } from "@reduxjs/toolkit";
import {
  GET_CURRENT_MONTH,
  GET_FILTERED_TRANSACTIONS,
} from "../constants/transactionConstants";

export const currentMonth = createAction(GET_CURRENT_MONTH);
export const filteredTransaction = createAction(GET_FILTERED_TRANSACTIONS);
