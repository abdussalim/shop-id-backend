const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");

const productsController = require("../controllers/products");
const { showAllProducts, showProduct, addProduct, editProduct, deleteProduct } =
  productsController;

const authorizationMiddleware = require("../middlewares/auth");
const { accessPass } = authorizationMiddleware;

const { authRoles } = require("../middlewares/authuser");

router
  .get("/", showAllProducts)
  .get("/:id", showProduct)
  .post("/", accessPass, authRoles, upload.single("thumbnail"), addProduct)
  .put("/:id", accessPass, authRoles, upload.single("thumbnail"), editProduct)
  .delete("/:id", accessPass, authRoles, deleteProduct);

module.exports = router;
