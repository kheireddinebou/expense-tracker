const routes = require("express").Router();
const {
  createCategory,
  getCategories,
  createTransaction,
  getTransactions,
  deleteTransaction,
  getLabels
} = require("../controller/controller");

routes.post("/api/categories", createCategory);

routes.get("/api/categories", getCategories);

routes.post("/api/transactions", createTransaction);

routes.delete("/api/transactions", deleteTransaction);

routes.get("/api/transactions", getTransactions);

routes.get('/api/labels', getLabels);

module.exports = routes;
