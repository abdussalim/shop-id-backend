const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { accessPass } = require("../middlewares/auth");

router.post("/register",usersController.registerNewUserAccount)
      .post("/login",usersController.loginUserAccount)
      .post("/refresh-token",usersController.refreshToken)
      .get("/profile",accessPass, usersController.userProfile);

module.exports = router;      