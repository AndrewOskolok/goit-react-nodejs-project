import axios from "axios";
// import { example } from "../actions/exampleAction.js";

axios.defaults.baseURL = "SET_DEFFAULT_URL";

const addTransactionOperation = (params) => async (dispatch) => {
  try {
    // loaderOn
    // const result = await axios.METHOD("path without default link");
    // some operation with result, if need
    // dispatch(example(result));
  } catch (error) {
    // errorHandler
  } finally {
    // loaderOff
  }
};

export default {addTransactionOperation};