const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions");
const {
      searchKeywordsTransactions,
      showAllTransactions,
      showTransaction,
      addTransaction,
      editTransaction,
      deleteTransaction
      } = transactionsController;

const authorizationMiddleware = require("../middlewares/auth");
const {accessPass} = authorizationMiddleware;

const {authRoles} = require("../middlewares/authuser");

router.get("/search/", accessPass, authRoles, searchKeywordsTransactions)
      .get("/", accessPass, authRoles, showAllTransactions)
      .get("/:id", accessPass, authRoles, showTransaction)
      .post("/", accessPass, authRoles, addTransaction)
      .put("/:id", accessPass, authRoles, editTransaction)
      .delete("/:id", accessPass, authRoles, deleteTransaction);

module.exports = router;