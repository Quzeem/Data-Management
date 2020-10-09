const express = require("express");
const { loginAdmin } = require("../controller/auth-controller");

const router = express.Router();

router.get("/login", loginAdmin);

module.exports = router;
