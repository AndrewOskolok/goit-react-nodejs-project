import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

import transactionOperations from "../../redux/opertions/formOperations.js";
import formSelectors from "../../redux/selectors/formSelectors";

import "react-datepicker/dist/react-datepicker.css";
import formStyle from "./transactionForm.module.css";
import "./transactionFormSelect.css";
import "./transactionFormDatepicker.css";

const initialState = {
  date: Number(moment(new Date()).format("D")),
  month: moment(new Date()).format("MMMM"),
  year: Number(moment(new Date()).format("YYYY")),
  type: "income",
  category: "",
  description: "",
  amount: "",
  balanceAfter: 0,
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vasya", label: "Vasya" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

const TransactionForm = ({
  addTransaction,
  getCategories,
  modalHandler,
  categoriesList,
}) => {
  const [transactionItem, setTransactionItem] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  let options = [
    // { value: "chocolate", label: "Chocolate" },
    // { value: "strawberry", label: "Strawberry" },
    // { value: "vasya", label: "Vasya" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "vanilla", label: "Vanilla" },
    // { value: "", label: "" },
  ];

  const getCategoriesNames = (list) => {    
    list.reduce((acc, item) => {
      acc.push(...item.name);
      return acc;
    }, []);
  };

  console.log("List", getCategoriesNames(categoriesList));

  console.log("categoriesList", categoriesList);

  useEffect(() => {    
    addListener();
    getCategories();
  }, []);

  const closeForm = () => {
    removeListener();
    modalHandler();
  };

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      removeListener();
      modalHandler();
    }
  };

  const addListener = () => {
    window.addEventListener("keydown", handleKeyDown);
  };

  const removeListener = () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

  const handleInputAmount = ({ target }) => {
    const { name, value } = target;
    if (Number(value) || value.length === 0) {
      setTransactionItem((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setTransactionItem((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSelect = (option) => {
    setTransactionItem((state) => ({
      ...state,
      category: option,
    }));
  };

  const handleCheckboxChange = ({ target }) => {
    const typeValue = target.checked ? "expense" : "income";
    setTransactionItem((state) => ({ ...state, type: typeValue }));
  };

  // const totalBalance = (amount) => {

  // }

  const validate = (amount, category, type) => {
    const errors = {};

    if (amount.length === 0) {
      console.log(amount);
      console.log("Введите число.");
      errors.amount = "Введите число!";
    }

    if (type === "expense" && category === "") {
      console.log(type);
      console.log(category);
      console.log("Выберите категорию!");
      errors.amount = "Выберите категорию!";
    }

    setErrors(errors);

    return !!Object.keys(errors).length;
  };

  const handleDate = (date) => {
    setStartDate(date);
    const formatedDate = moment(date).format("DD/MMMM/yyyy");
    console.log(formatedDate);
    const dateD = moment(formatedDate).date();
    const month = moment(formatedDate).format("MMMM");
    const year = moment(formatedDate).year();
    setTransactionItem((state) => ({
      ...state,
      date: dateD,
      month: month,
      year: year,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      type,
      amount,
      category,
      // description,
    } = transactionItem;

    const validateResult = validate(amount, category, type);

    if (!validateResult) {
      if (event.target[1].checked) {
        transactionItem.category = transactionItem.category.value;
      }
      event.target[1].checked
        ? // totalBalance
          (transactionItem.balanceAfter = -amount)
        : (transactionItem.balanceAfter = +amount);
      transactionItem.amount = Number(transactionItem.amount);
      addTransaction(transactionItem);
      setTransactionItem(initialState);
      modalHandler();
      removeListener();
    }
    return validateResult;
  };

  return (
    <>
      <form
        className={formStyle.form}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className={formStyle.form__title}>Добавить транзакцию</h2>

        <button className={formStyle.form__closeBtn} onClick={closeForm} />

        <div className={formStyle.form__checkbox_wrapper}>
          <label className={formStyle.form__checkbox_label}>
            <input
              id="check"
              type="checkbox"
              className={formStyle.form__checkbox_input}
              onChange={handleCheckboxChange}
            />
            <span className={formStyle.form__checkbox_span}></span>

            <label className={formStyle.form__checkbox_income} htmlFor="check">
              Доход
            </label>
            <label
              className={formStyle.form__checkbox_consumption}
              htmlFor="check"
            >
              Расход
            </label>
          </label>
        </div>
        {transactionItem.type === "income" ? null : (
          <Select
            className="select"
            classNamePrefix="selectprefix"
            options={options}
            noOptionsMessage={() => "Категория не найдена"}
            placeholder="Выберите категорию"
            // menuIsOpen={true}
            isSearchable={true}
            name="category"
            value={transactionItem.category}
            onChange={handleSelect}
          />
        )}
        <div className={formStyle.form__acBox}>
          <input
            type="text"
            className={formStyle.form__amount}
            placeholder="0.00"
            name="amount"
            value={transactionItem.amount}
            onChange={handleInputAmount}
            // required
          />
          <DatePicker
            id="select"
            className={formStyle.form__calendar}
            selected={startDate}
            onChange={handleDate}
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <input
          type="text"
          className={formStyle.form__description}
          placeholder="Комментарий"
          name="description"
          value={transactionItem.description}
          onChange={handleInput}
        />
        <button className={formStyle.form__add_btn}>Добавить</button>
        <button className={formStyle.form__cancel_btn} onClick={closeForm}>
          Отмена
        </button>
      </form>
      <div className={formStyle.overlay} onClick={closeForm}></div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // totalBalance: ,
  categoriesList: formSelectors.categoriesSelector(state),
});

const mapDispatchToProps = {
  addTransaction: transactionOperations.addTransactionOperation,
  getCategories: transactionOperations.getCategoriesOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
