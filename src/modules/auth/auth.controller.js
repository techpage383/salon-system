const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../config/db");
const env = require("../../config/env");
const ApiError = require("../../utils/apiError");
const asyncHandler = require("../../utils/asyncHandler");

const signToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ApiError(409, "Email already in use.");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { fullName, email, passwordHash, role: role || "staff" },
  });

  const token = signToken(user.id);
  res.status(201).json({
    message: "Registration successful.",
    token,
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(401, "Invalid email or password.");

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new ApiError(401, "Invalid email or password.");

  const token = signToken(user.id);
  res.json({
    message: "Login successful.",
    token,
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, fullName: true, email: true, role: true, createdAt: true },
  });
  if (!user) throw new ApiError(404, "User not found.");
  res.json(user);
});

module.exports = { register, login, me };
