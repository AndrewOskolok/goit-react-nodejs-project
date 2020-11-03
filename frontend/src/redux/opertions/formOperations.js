import axios from "axios";
import {getCategories, editBalanceOnAdd, editBalanceOnEdit, editTransaction} from "../actions/transactionFormActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";
import { errorOn } from "../actions/errorAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";

const addTransactionOperation = (transaction, token) => async (dispatch) => {
  try {   
    dispatch(loaderToggle());
    const { data } = await axios({
      method: "post",
      data: transaction,
      url: "/transactions",
      headers: {
        Authorization: token,
      },
    });     
    dispatch(addTransaction(data));
    dispatch(editBalanceOnAdd(data));
  } catch (error) {
    dispatch(errorOn(error));
  } finally {
    dispatch(loaderToggle());
  }
};

const editTransactionOperation = (transaction, id, token) => async (
  dispatch
) => {
  delete transaction.id;

  try {
    dispatch(loaderToggle());
    const { data } = await axios({
      method: "patch",
      data: transaction,
      url: `/transactions/${id}`,
      headers: {
        Authorization: token,
      },
    });    
    dispatch(editTransaction(data));
    dispatch(editBalanceOnEdit(data));
  } catch (error) {
    dispatch(errorOn(error));  
  } finally {
    dispatch(loaderToggle());
  }
};

const getCategoriesOperation = () => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    const result = await axios.get("/categories");
    if (result.status === 200) {
      dispatch(getCategories(result));
    }
  } catch (error) { 
    dispatch(errorOn(error));  
  } finally {
    dispatch(loaderToggle());
  }
};

export default {
  addTransactionOperation,
  getCategoriesOperation,
  editTransactionOperation,
};
