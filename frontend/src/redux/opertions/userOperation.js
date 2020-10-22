import axios from "axios";
import { getUser } from "../actions/userAction.js";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

export const registerHandler = (userObject) => async (dispatch) => {
    try {
      // loaderOn
      const result = await axios.post('/auth/register', userObject);
      console.log('result :>> ', result);
      if (result.status === 201) {
        dispatch(getUser('onVerification'))
      }
      // dispatch(example(result));
    } catch (error) {
      console.log('error :>> ', error);
      // errorHandler
    } finally {
      // loaderOff
    }
  };
  
  export const loginHandler = (userObject) => async (dispatch) => {
      try {
        // loaderOn
        const result = await axios.post('/auth/login', userObject);
        console.log('result :>> ', result.data);
        dispatch(getUser(result.data));
      } catch (error) {
        console.log('error :>> ', error);
        // errorHandler
      } finally {
        // loaderOff
      }
    };
    