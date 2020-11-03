import axios from "axios";
import { errorOn } from "../actions/errorAction.js";
import {
  getUser,
  updateUser,
  updateUserAvatar,
} from "../actions/userAction.js";

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

export const updateToken = (token, refreshToken, sid) => async (dispatch) => {
  try {
    const result = await axios.get("/users", {
      headers: {
        Authorization: token,
      },
    });

    dispatch(updateUser(result.data));
  } catch (error) {
    const result = await axios({
      method: "post",
      data: {
        sid: sid,
      },
      url: "/auth/refresh",
      headers: {
        Authorization: refreshToken,
      },
    });

    dispatch(updateUser(result.data));
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
