const express = require("express");
const {
  PostReservationCustomer,
  PutReservationCanceledCustomer,
} = require("../controller/reservation.controller");
const { verifyToken } = require("../lib/middleware");
const router = express();

router.post("/customer/reservation", verifyToken, PostReservationCustomer);
router.put(
  "/customer/reservation/canceled/:transaction_id",
  verifyToken,
  PutReservationCanceledCustomer
);
// router.post("/officer/floor", PostFloorOfficer);
// router.put("/officer/floor/:floor_id", PutFloorOfficer);
// router.delete("/officer/floor/:floor_id", DeleteFloorController);

// router.get("/customer/floor", verifyTokenConditional, GetFloorCustomer);

module.exports = router;
