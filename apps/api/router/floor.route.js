const express = require("express");
const { PostFloorOfficer } = require("../controller/floor.controller");
const router = express();

router.post("/officer/floor", PostFloorOfficer);

module.exports = router;
