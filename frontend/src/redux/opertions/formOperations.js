import axios from "axios";
import moment from "moment";
import categoriesActions from "../actions/categoriesActions";
import { addTransaction } from "../actions/transactionActions";
import { loaderToggle } from "../actions/loaderAction";

axios.defaults.baseURL = "https://goit-react-nodejs-project.herokuapp.com";
// axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZjhmMmEwNjZjYmU4NDAwMTcwYzc3M2MiLCJzaWQiOiI1ZjkyYzU4OTk3OTQyNTAwMTdkNGZiNTkiLCJpYXQiOjE2MDM0NTQzNDUsImV4cCI6MTYwMzQ1NjE0NX0.4xscnNrQATCgHd2A66G4Ms7SejZ9OvnZEQ7xkv4nuCE";

const addTransactionOperation = (transaction) => async (dispatch) => {
  try {
    dispatch(loaderToggle());
    console.log("transaction", transaction);
    // const result = await axios.post("/transactions", transaction);
    const {data} = await axios({
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
    console.dir(error);
    console.log("Fetch Error!!!");
    // dispatch(errorOn(error));
  } finally {
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
  }
};

export default { addTransactionOperation, getCategoriesOperation };
