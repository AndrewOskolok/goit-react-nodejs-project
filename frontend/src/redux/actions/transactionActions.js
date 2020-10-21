import {createAction} from "@reduxjs/toolkit";
import transactionConstants from "../constants/transactionConstants.js";

const addTransaction = createAction(transactionConstants.ADD_TRANSACTION);
const getCategories = createAction(transactionConstants.GET_CATEGORIES);

export default {
  addTransaction,
  getCategories
}