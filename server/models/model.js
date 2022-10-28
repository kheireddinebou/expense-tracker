const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  type: {
    type: String,
    default: "Investment",
  },
  color: {
    type: String,
    default: "#FCBE44",
  },
});

const transactionSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Investement",
  },
  name: {
    type: String,
    default: "Anonymous",
  },
  amount: {
    type: Number,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("Category", categorySchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
  Category,
  Transaction,
};
