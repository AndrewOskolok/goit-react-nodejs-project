import axios from "axios";
import categoriesActions from "../actions/transactionFormActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";
import { errorOn, errorOff } from "../actions/errorAction";

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
    console.log("balanceAfter  ADD", data.balanceAfter);
    console.log("Trabsaction  ADD", data);
    dispatch(addTransaction(data));
    dispatch(categoriesActions.editCurrentBalanceOnAdd(data));
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
    console.log("DataOnEdit", data.updatedTransaction);
    console.log("balanceAfter  EDIT", data.currentBalance);
    dispatch(categoriesActions.editTransaction(data.updatedTransaction));
    dispatch(categoriesActions.editCurrentBalanceOnEdit(data));
  } catch (error) {
    dispatch(errorOn(error));
    // console.dir(error);
  } finally {
    dispatch(loaderToggle());
  }
};

const getCategoriesOperation = () => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    const result = await axios.get("/categories");
    if (result.status === 200) {
      dispatch(categoriesActions.getCategories(result));
    }
  } catch (error) {
    console.log("ERROR!");
  } finally {
    dispatch(loaderToggle());
  }
};

export default {
  addTransactionOperation,
  getCategoriesOperation,
  editTransactionOperation,
};
