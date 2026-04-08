const express = require("express");
const validate = require("../../middlewares/validate");
const { protect } = require("../../middlewares/auth");
const {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
} = require("./appointment.validation");
const {
  listAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./appointment.controller");

const router = express.Router();

router.use(protect);
router.get("/", listAppointments);
router.get("/:id", validate(appointmentIdSchema), getAppointment);
router.post("/", validate(createAppointmentSchema), createAppointment);
router.patch("/:id", validate(updateAppointmentSchema), updateAppointment);
router.delete("/:id", validate(appointmentIdSchema), deleteAppointment);

module.exports = router;
