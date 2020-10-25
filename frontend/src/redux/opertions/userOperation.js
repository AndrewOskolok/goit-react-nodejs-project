import axios from "axios";
import { getUser } from "../actions/userAction.js";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

export const loginHandler = (userObject) => async (dispatch) => {
  try {
    const result = await axios.post("/auth/login", userObject);
    dispatch(getUser(result.data));
  } catch (error) {
    console.log("error :>> ", error);
  }
};
