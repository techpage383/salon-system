const prisma = require("../../config/db");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandler");

const listCustomers = asyncHandler(async (_req, res) => {
  const data = await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
  res.json(data);
});

const getCustomer = asyncHandler(async (req, res) => {
  const data = await prisma.customer.findUnique({ where: { id: req.params.id } });
  if (!data) throw new ApiError(404, "Customer not found.");
  res.json(data);
});

const createCustomer = asyncHandler(async (req, res) => {
  const data = await prisma.customer.create({ data: req.body });
  res.status(201).json(data);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const exists = await prisma.customer.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new ApiError(404, "Customer not found.");

  const data = await prisma.customer.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(data);
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const exists = await prisma.customer.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new ApiError(404, "Customer not found.");

  await prisma.customer.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
