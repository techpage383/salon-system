const { z } = require("zod");

const appointmentBody = z.object({
  serviceName: z.string().min(2),
  servicePrice: z.coerce.number().nonnegative(),
  appointmentAt: z.string().datetime(),
  status: z.enum(["scheduled", "done", "cancelled"]).optional(),
  notes: z.string().optional(),
  customerId: z.coerce.number().int().positive(),
  staffId: z.coerce.number().int().positive(),
});

const createAppointmentSchema = z.object({
  body: appointmentBody,
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
});

const updateAppointmentSchema = z.object({
  body: appointmentBody.partial(),
  query: z.object({}).optional().default({}),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

const appointmentIdSchema = z.object({
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentIdSchema,
};
