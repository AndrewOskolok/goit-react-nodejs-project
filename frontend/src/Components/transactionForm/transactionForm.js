import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import transactionOperations from "../../redux/opertions/transactionOperations.js";

import formStyle from "./transactionForm.module.css";
import "./select.css";
import "./datepickerStyles.css";

const initialState = {
  date: moment(new Date()).format('D'),
  month: moment(new Date()).format('MMMM'),
  year: moment(new Date()).format('YYYY'),
  type: "income",
  category: "",
  description: "",
  amount: "",
  balance: 0,
  balanceAfter: 0,
};



const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
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
  { value: "vanilla", label: "Vanilla" },
];

const TransactionForm = ({ addTransaction }) => {
  const [transactionItem, setTransactionItem] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date()); 
  const [errors, setErrors] = useState({}); 

  const closeForm = (event) => {
    event.preventDefault();
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setTransactionItem((state) => ({
      ...state,
      [name]: value,
    }));
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

  const handleSelect = (option) => {
    setTransactionItem((state) => ({
      ...state,
      category: option,
    }));
  };

  const handleCheckboxChange = ({ target }) => {
    const typeValue = target.checked ? "consumption" : "income";
    setTransactionItem((state) => ({ ...state, type: typeValue }));
  };

  const validate = (amount, category, type) => {
    const errors = {};

    if (amount.length === 0) {
      console.log(amount);
      console.log("Введите число.");
      errors.amount = "Введите число!";
    }

    if (type === "consumption") {
      console.log(category.value);
    }

    setErrors(errors);

    return !!Object.keys(errors).length;
  };  
 
  const handleDate = (date) => {
    setStartDate(date);   
    const formatedDate = moment(date).format("DD/MMMM/yyyy");
    console.log(formatedDate);  
    const dateD = moment(formatedDate).date();   
    const month  = moment(formatedDate).format('MMMM'); 
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
      amount,     
      category,
      // description,
    } = transactionItem;

    const validateResult = validate(amount, category);

    if (!validateResult) {
      transactionItem.category = transactionItem.category.value;
      addTransaction(transactionItem);
      setTransactionItem(initialState);
      console.log("transactionValidate", transactionItem);

      const typeValue = event.target[1].checked ? "consumption" : "income";
      setTransactionItem((state) => ({ ...state, type: typeValue }));

      // closeForm();
    }
    return validateResult;
  };

  console.log("setStartDate", startDate);

  console.log("transactionItem", transactionItem);

  return (
    <>
      <form
        className={formStyle.form}
        noValidate
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
            required
          />
          <DatePicker
            id="select"
            className={formStyle.form__calendar}
            selected={startDate}
            onChange={handleDate}
            dateFormat="dd.MM.yyyy"
          />
        </div>
        <textarea
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addTransaction: transactionOperations.addTransactionOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
