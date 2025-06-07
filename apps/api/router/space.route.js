const express = require("express");
const {
  DeleteSpaceOfficer,
  GetSpaceCustomer,
  GetSpaceOfficer,
  PostSpaceOfficer,
  PutSpaceOfficer,
} = require("../controller/space.controller");
const router = express();

router.get("/officer/space", GetSpaceOfficer);
router.post("/officer/space", PostSpaceOfficer);
router.put("/officer/space/:floor_id", PutSpaceOfficer);
router.delete("/officer/space/:floor_id", DeleteSpaceOfficer);

router.get("/customer/space", GetSpaceCustomer);

module.exports = router;
