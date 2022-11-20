const express = require("express");
const routers = express.Router();

const {authRoles} = require("../middlewares/authuser")

const usersRouter = require("./users")
const productsRouter = require("./products");
const categoriesRouter = require("./categories");
const transactionsRouter = require("./transactions");
const detailTransactionsRouter = require("./detail_transactions");
const paymentRouter = require("./payment");

routers.use("/users", usersRouter)
       .use("/products", productsRouter)
       .use("/categories", categoriesRouter)
       .use("/transactions", transactionsRouter)
       .use("/detail_transactions", detailTransactionsRouter)
       .use("/payment", paymentRouter);

module.exports = routers;