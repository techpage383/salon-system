const { z } = require("zod");

const customerBody = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5).optional(),
  email: z.string().email().optional(),
  notes: z.string().optional(),
});

const createCustomerSchema = z.object({
  body: customerBody,
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({}),
});

const updateCustomerSchema = z.object({
  body: customerBody.partial(),
  query: z.object({}).optional().default({}),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

const customerIdSchema = z.object({
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

module.exports = { createCustomerSchema, updateCustomerSchema, customerIdSchema };
