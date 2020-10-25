import axios from "axios";
import { errorOn } from "../actions/errorAction.js";
import { getUser, updateUserAvatar } from "../actions/userAction.js";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

export const loginHandler = (userObject) => async (dispatch) => {
  try {
    const result = await axios.post("/auth/login", userObject);
    dispatch(getUser(result.data));
  } catch (error) {
    dispatch(errorOn({ message: "Неверный Email или пароль" }));
    console.log("error :>> ", error);
  }
};

export const verifiedEmail = (verifiedKey) => async (dispatch) => {
  try {
    const result = await axios.get(`/auth/verify/${verifiedKey}`);
    console.log(result);
  } catch (error) {
    console.log("Email уже подтверждён");
  }
};

export const avatarHandler = (ava, token) => async (dispatch) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("avatar", ava);

    const result = await axios({
      method: "patch",
      url: "/users/avatar",
      data: bodyFormData,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(updateUserAvatar(result.data.avatarURL));
  } catch (error) {
    console.log(error);
  }
};
