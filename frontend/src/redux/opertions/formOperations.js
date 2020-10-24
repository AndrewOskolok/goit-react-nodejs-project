import axios from "axios";
import categoriesActions from "../actions/categoriesActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjkyZTkxZDk3OTQyNTAwMTdkNGZiNmIiLCJpYXQiOjE2MDM0NjM0NTMsImV4cCI6MTYwMzQ2NTI1M30.2RbhwMxaC2xKm4Uf7eCm27IS63LZOAhTvmEZ0KoIb7Y";

const addTransactionOperation = (transaction) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    console.log("transaction", transaction);
    // const result = await axios.post("/transactions", transaction);
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
