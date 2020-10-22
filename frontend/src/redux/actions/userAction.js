import { createAction } from "@reduxjs/toolkit";
import { USER_TOGGLE } from "../constants/user";

export const userToggle = createAction(USER_TOGGLE);
