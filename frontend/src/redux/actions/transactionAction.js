import { createAction } from "@reduxjs/toolkit";
import { GET_CURRENT_MONTH } from "../constants/constants";

export const currentMonth = createAction(GET_CURRENT_MONTH);
