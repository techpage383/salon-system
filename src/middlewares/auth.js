const jwt = require("jsonwebtoken");
const prisma = require("../config/db");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

const protect = async (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next(new ApiError(401, "Unauthorized: token missing."));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return next(new ApiError(401, "Unauthorized: user not found."));

    req.user = { id: user.id, role: user.role, email: user.email };
    return next();
  } catch (_error) {
    return next(new ApiError(401, "Unauthorized: invalid token."));
  }
};

module.exports = { protect };
