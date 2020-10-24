import axios from "axios";
import categoriesActions from "../actions/categoriesActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");

const addTransactionOperation = (transaction, token) => async (dispatch) => {
  // console.log("token", token);
  try {
    dispatch(loaderToggle());
    console.log("transaction", transaction); 
    const { data } = await axios({
      method: "post",
      data: transaction,
      url: "/transactions",
      headers: {
        Authorization: token,
      },
    });

    console.log("result after fetch", data);
    dispatch(addTransaction(data));
  } catch (error) {
    console.log("Fetch Error!!!");
    // dispatch(errorOn(error));
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

export default { addTransactionOperation, getCategoriesOperation };
