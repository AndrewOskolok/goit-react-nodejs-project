// import axios from "axios";
// import { example } from "../actions/userAction.js";

// axios.defaults.baseURL = "SET_DEFFAULT_URL";

const exampleHandler = (params) => async (dispatch) => {
    try {
      //loaderOn
      // const result = await axios.METHOD("path without default link");
      // some operation with result, if need
      // dispatch(example(result));
    } catch (error) {
      //errorHandler
    } finally {
      //loaderOff
    }
  };
  
  export default example;
  