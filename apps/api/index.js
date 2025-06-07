const express = require("express");
const routerFloor = require("./router/floor.route.js");
const routerSpace = require("./router/space.route.js");
const routerAuth = require("./router/auth.route.js");
const routerReservation = require("./router/reservation.route.js");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routerFloor);
app.use(routerSpace);
app.use(routerAuth);
app.use(routerReservation);
app.get("/", (_req, res) => {
  res.send("Hello from Express API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
