const express = require("express");
const { register, verifyEmailController, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmailController);
router.post("/login", login);

module.exports = router;
