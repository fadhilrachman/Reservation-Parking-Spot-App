const express = require("express");
const {
  PostFloorOfficer,
  DeleteFloorController,
  PutFloorOfficer,
  GetFloorOfficer,
  GetFloorCustomer,
} = require("../controller/floor.controller");
const router = express();

router.get("/officer/floor", GetFloorOfficer);
router.post("/officer/floor", PostFloorOfficer);
router.put("/officer/floor/:floor_id", PutFloorOfficer);
router.delete("/officer/floor/:floor_id", DeleteFloorController);

router.get("/customer/floor", GetFloorCustomer);

module.exports = router;
