import { createAction } from "@reduxjs/toolkit";
import { GET_USER } from "../constants/constants";

export const getUser = createAction(GET_USER);
