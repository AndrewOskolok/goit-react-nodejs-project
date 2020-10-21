import axios from "axios";
import transactionActions from "../actions/categoriesActions.js";
// import { loaderOn, loaderOff } from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const addTransactionOperation = (transaction) => async (dispatch) => {
  try {
    console.log("transaction", transaction);
    // dispatch(loaderOn());
    const result = await axios.post("/transactions", transaction);
    console.dir(result);
    dispatch(transactionActions.addTransaction(result));
  } catch (error) {
    // dispatch(errorOn(error));
  } finally {
    // dispatch(loaderOff());
  }
};

const getCategoriesOperation = () => async (dispatch) => {
  try {
    const result = await axios.get("/categories");
    // console.dir(result);
    if (result.status === 200) {
      dispatch(transactionActions.getCategories(result));
    } 
  } catch (error) {
    console.log("ERROR!");
  }
};

export default { addTransactionOperation, getCategoriesOperation };
