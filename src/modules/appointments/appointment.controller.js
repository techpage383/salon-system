const prisma = require("../../config/db");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandler");

const listAppointments = asyncHandler(async (_req, res) => {
  const data = await prisma.appointment.findMany({
    orderBy: { appointmentAt: "asc" },
    include: {
      customer: { select: { id: true, fullName: true, phone: true } },
      staff: { select: { id: true, fullName: true, email: true } },
    },
  });
  res.json(data);
});

const getAppointment = asyncHandler(async (req, res) => {
  const data = await prisma.appointment.findUnique({
    where: { id: req.params.id },
    include: { customer: true, staff: { select: { id: true, fullName: true, email: true } } },
  });
  if (!data) throw new ApiError(404, "Appointment not found.");
  res.json(data);
});

const createAppointment = asyncHandler(async (req, res) => {
  const customer = await prisma.customer.findUnique({ where: { id: req.body.customerId } });
  if (!customer) throw new ApiError(400, "Invalid customerId.");
  const staff = await prisma.user.findUnique({ where: { id: req.body.staffId } });
  if (!staff) throw new ApiError(400, "Invalid staffId.");

  const data = await prisma.appointment.create({
    data: {
      ...req.body,
      appointmentAt: new Date(req.body.appointmentAt),
    },
  });
  res.status(201).json(data);
});

const updateAppointment = asyncHandler(async (req, res) => {
  const exists = await prisma.appointment.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new ApiError(404, "Appointment not found.");

  const data = await prisma.appointment.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
      ...(req.body.appointmentAt ? { appointmentAt: new Date(req.body.appointmentAt) } : {}),
    },
  });
  res.json(data);
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const exists = await prisma.appointment.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new ApiError(404, "Appointment not found.");

  await prisma.appointment.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = {
  listAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
