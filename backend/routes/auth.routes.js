const express = require("express");
const {
  login,
  getNewToken,
  logout,
} = require("../controllers/auth.controller");

const router = express.Router();

//POST - Login User. Sends back access token and refresh token
router.post("/login", login);

//POST - Fetch a new access token
router.post("/refresh_token", getNewToken);

router.post("/logout", logout);

module.exports = router;