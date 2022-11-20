const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment");
const {
      searchKeywordsPayments,
      showAllPayments,
      showPayment,
      addPayment,
      editPayment,
      deletePayment
      } = paymentController;

const authorizationMiddleware = require("../middlewares/auth");
const {accessPass} = authorizationMiddleware;

const {authRoles} = require("../middlewares/authuser");

router.get("/search/", accessPass, authRoles, searchKeywordsPayments)
      .get("/", accessPass, authRoles, showAllPayments)
      .get("/:id", accessPass, authRoles, showPayment)
      .post("/", accessPass, authRoles, addPayment)
      .put("/:id", accessPass, authRoles, editPayment)
      .delete("/:id", accessPass, authRoles, deletePayment);

module.exports = router;