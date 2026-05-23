import Fastify from "fastify";
import { healthRoutes } from "./routes/health.routes";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "Welcome to Smart Factory Monitoring Platform Backend",
  };
});

app.register(healthRoutes);

const start = async () => {
  try {
    await app.listen({
      port: 5000,
    });

    console.log("Server running on port 5000");
  } catch (error) {
    app.log.error(error);

    process.exit(1);
  }
};

start();
