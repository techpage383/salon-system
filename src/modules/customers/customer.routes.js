const express = require("express");
const validate = require("../../middlewares/validate");
const { protect } = require("../../middlewares/auth");
const {
  createCustomerSchema,
  updateCustomerSchema,
  customerIdSchema,
} = require("./customer.validation");
const {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("./customer.controller");

const router = express.Router();

router.use(protect);
router.get("/", listCustomers);
router.get("/:id", validate(customerIdSchema), getCustomer);
router.post("/", validate(createCustomerSchema), createCustomer);
router.patch("/:id", validate(updateCustomerSchema), updateCustomer);
router.delete("/:id", validate(customerIdSchema), deleteCustomer);

module.exports = router;
