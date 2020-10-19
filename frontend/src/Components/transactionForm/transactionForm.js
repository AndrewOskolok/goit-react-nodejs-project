import React, { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";

import transactionOperations from "../../redux/opertions/transactionOperations.js";

import formStyle from "./transactionForm.module.css";
import "./select.css";
import "./datepickerStyles.css";

const initialState = {
  date: "",
  month: "",
  year: "",
  type: "income", // string (income | consumption)
  category: "",
  description: "",
  amount: "",
  balance: 0,
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
  // const [errors, setErrors] = useState({});

  const closeForm = (event) => {

  }

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setTransactionItem((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleCheckboxChange = ({ target }) => {
    const typeValue = target.checked ? "consumption" : "income";
    setTransactionItem((state) => ({ ...state, type: typeValue }));
  };

  const validate = (amount, category) => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      type,
      amount,
      date,
      month,
      year,
      category,
      description,
    } = transactionItem;

    const transaction = {
      type,
      amount,
      date,
      month,
      year,
      category,
      description,
    };

    const validateResult = validate(amount, category);

    if (!validateResult) {
      addTransaction(transaction);
      setTransactionItem(initialState);
      closeForm();
    }
  };

  console.log(transactionItem);

  return (
    <>
      <form
        className={formStyle.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className={formStyle.form__title}>Добавить транзакцию</h2>

        <button className={formStyle.form__closeBtn} onClick={closeForm}/>

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
            isSearchable
          />
        )}
        <div className={formStyle.form__acBox}>
          <input
            type="text"
            className={formStyle.form__amount}
            placeholder="0.00"
            name="amount"
            value={transactionItem.amount}
            onChange={handleInput}
          />
          <DatePicker
            id="select"
            className={formStyle.form__calendar}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
        <button className={formStyle.form__cancel_btn} onClick={closeForm}>Отмена</button>
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
