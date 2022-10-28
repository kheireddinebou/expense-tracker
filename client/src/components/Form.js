import React, { useState } from "react";
import axios from "axios";
import History from "./History";

const Form = ({labels, deleteTransaction, getLabels}) => {
  const [formData, setFormData] = useState({ type: "Investment" });

  const { name, type, amount } = formData;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await axios
      .post("http://localhost:3005/api/transactions", formData)
      .catch(error => console.log(error))
      .finally(() => getLabels())
    setFormData({ type: "Investment", amount: "", name: "" });
  };

  return (
    <div className="d-flex flex-column gap-3 w-75 mx-auto form">
      <span className="h2 fw-bolder text-center">Transaction</span>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder=" Sallary, House Rend, Rip"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />

        <select
          onChange={handleChange}
          value={type}
          name="type"
          className="form-select mb-3"
        >
          <option value="Investment" defaultValue>
            Investment
          </option>
          <option value="Expense">Expense</option>
          <option value="Savings">Savings</option>
        </select>
        <input
          onChange={handleChange}
          name="amount"
          className="form-control mb-3"
          placeholder="Amount"
          type="number"
          value={amount}
          required
        />
        <button className="w-100 btn" type="submit">
          Make Transaction
        </button>
      </form>

      <span className="h2 fw-bolder text-center mt-3">History</span>
      <History labels={labels} deleteTransaction={deleteTransaction}/>
    </div>
  );
};

export default Form;
