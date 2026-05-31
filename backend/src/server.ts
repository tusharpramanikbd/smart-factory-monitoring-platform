import "dotenv/config";

import Fastify from "fastify";
import { healthRoutes } from "./routes/health.routes";
import { machineRoutes } from "./routes/machine.routes";
import { sensorRoutes } from "./routes/sensor.routes";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "Welcome to Smart Factory Monitoring Platform Backend",
  };
});

app.register(healthRoutes);
app.register(machineRoutes);
app.register(sensorRoutes);

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT),
    });

    console.log("Server running on port 5000");
  } catch (error) {
    app.log.error(error);

    process.exit(1);
  }
};

start();
