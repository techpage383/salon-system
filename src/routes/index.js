const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const customerRoutes = require("../modules/customers/customer.routes");
const appointmentRoutes = require("../modules/appointments/appointment.routes");

const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Salon API is running." });
});

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;
