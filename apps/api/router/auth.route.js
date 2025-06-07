const express = require("express");
const { PostLogin, PostRegister } = require("../controller/auth.controller");
const router = express();

router.post("/login", PostLogin);
router.post("/register", PostRegister);

module.exports = router;
