const express = require("express");
const router = express.Router()
const categoriesController = require("../controllers/categories");
const {
      searchKeywordsCategories,
      showAllCategories,
      showCategory,
      addCategory,
      editCategory,
      deleteCategory
      } = categoriesController;

const authorizationMiddleware = require("../middlewares/auth");
const {accessPass} = authorizationMiddleware;

const {authRoles} = require("../middlewares/authuser");

router.get("/search/", accessPass, authRoles, searchKeywordsCategories)
      .get("/", accessPass, authRoles, showAllCategories)
      .get("/:id", accessPass, authRoles, showCategory)
      .post("/", accessPass, authRoles, addCategory)
      .put("/:id", accessPass, authRoles, editCategory)
      .delete("/:id", accessPass, authRoles, deleteCategory);

module.exports = router;