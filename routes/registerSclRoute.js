const express = require("express");
const router = express.Router();

const registerSchool = require("../controllers/registerSchool");
const getSchools = require("../controllers/getSchools");

router.post("/register", registerSchool);
router.get("/all", getSchools);

module.exports = router;
 
