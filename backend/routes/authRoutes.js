const authController = require("../controllers/authController");
const { registerAdmin, loginAdmin } = authController;
const express = require("express");
const router = express.Router();


router.post("/register", registerAdmin);  // Only use once or disable after registering admin
router.post("/login", loginAdmin);

module.exports = router;