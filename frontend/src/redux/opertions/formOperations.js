import axios from "axios";
import categoriesActions from "../actions/categoriesActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("user.accessToken");

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjkzZjJmODI1Y2Q4MjAwMTdlNWIxMGUiLCJzaWQiOiI1ZjkzZmJjOTI1Y2Q4MjAwMTdlNWIxMWIiLCJpYXQiOjE2MDM1MzM3NjksImV4cCI6MTYwMzUzNTU2OX0.nqUvNBbDjQ0CA-sg-sfgKFvfLtp140fQ-nThOzZgxfs";

const addTransactionOperation = (transaction) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    console.log("transaction", transaction);
    // const result = await axios.post("/transactions", transaction);
    const { data } = await axios({
      method: "post",
      data: transaction,
      url: "/transactions",
      // headers: {
      //   Authorization: token,
      // },
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
