const express = require("express");
const router = express.Router();

const detailTransactionsController = require("../controllers/detail_transactions");
const {
      searchKeywordsDetailTransactions,
      showAllDetailTransactions,
      showDetailTransaction,
      addDetailTransaction,
      editDetailTransaction,
      deleteDetailTransaction
      } = detailTransactionsController;

const authorizationMiddleware = require("../middlewares/auth");
const {accessPass} = authorizationMiddleware;

const {authRoles} = require("../middlewares/authuser");

router.get("/search/", accessPass, authRoles, searchKeywordsDetailTransactions)
      .get("/", accessPass, authRoles, showAllDetailTransactions)
      .get("/:id", accessPass, authRoles, showDetailTransaction)
      .post("/", accessPass, authRoles, addDetailTransaction)
      .put("/:id", accessPass, authRoles, editDetailTransaction)
      .delete("/:id", accessPass, authRoles, deleteDetailTransaction);

module.exports = router;