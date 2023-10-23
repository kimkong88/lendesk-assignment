const express = require("express");
const authRoute = require("./auth.route");
const pingRoute = require("./ping.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/ping", pingRoute);

module.exports = router;
