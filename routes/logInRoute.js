const express = require("express");
const router = express.Router();

const login = require("../controllers/LogIn/login");
const getProfile = require("../controllers/Login/getProfile");
const verifyToken = require("../middleware/auth");

router.post("/login", login);
router.get("/profile", verifyToken(["admin", "teacher", "student"]), getProfile);  

module.exports = router;
 