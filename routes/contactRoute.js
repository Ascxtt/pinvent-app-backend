const express = require("express");
const { contactUs } = require("../controllers/contactControlller");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/", protect, contactUs);

module.exports = router;
