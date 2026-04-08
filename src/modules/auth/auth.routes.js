const express = require("express");
const validate = require("../../middlewares/validate");
const { protect } = require("../../middlewares/auth");
const { registerSchema, loginSchema } = require("./auth.validation");
const { register, login, me } = require("./auth.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, me);

module.exports = router;
