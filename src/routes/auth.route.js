const express = require("express");
const { authValidation } = require("../validations");
const { authController } = require("../controllers");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.post(
    "/register",
    validate(authValidation.register),
    authController.register
);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
