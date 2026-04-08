const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/db");

const server = app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});

const shutdown = async () => {
  console.log("Shutting down server...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
