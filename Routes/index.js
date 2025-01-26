const express = require("express");
const router = express();

const mailRoute = require("./mail/mail");
const userRoute = require("./user/user");


router.use("/mail", mailRoute);
router.use("/user", userRoute);

module.exports = router;
