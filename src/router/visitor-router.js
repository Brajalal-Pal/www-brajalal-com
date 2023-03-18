const express = require("express");
const { saveVisitorInfo, getVisitorInfo } = require("../controller/visitor-controller");
const router = express.Router();

router.get("/info", getVisitorInfo);
router.post("/save", saveVisitorInfo);

module.exports = router;
