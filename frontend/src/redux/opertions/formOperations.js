import axios from "axios";
import transactionActions from "../actions/categoriesActions.js";
import {loaderToggle} from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const addTransactionOperation = (transaction) => async (dispatch) => {
  try { 
    dispatch(loaderToggle());
    const result = await axios.post("/transactions", transaction);    
    dispatch(transactionActions.addTransaction(result));
  } catch (error) {
    console.log("Fetch Error!!!")
    // dispatch(errorOn(error));
  } finally {    
  }
};

const getCategoriesOperation = () => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    const result = await axios.get("/categories");   
    if (result.status === 200) {
      dispatch(transactionActions.getCategories(result));
    } 
  } catch (error) {
    console.log("ERROR!");
  }
};

export default { addTransactionOperation, getCategoriesOperation };
