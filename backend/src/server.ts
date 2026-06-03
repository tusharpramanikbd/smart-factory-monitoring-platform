import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";

import { healthRoutes } from "./routes/health.routes";
import { machineRoutes } from "./routes/machine.routes";
import { sensorRoutes } from "./routes/sensor.routes";
import { startTelemetryLoop } from "./services/telemetry.service";

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
    await app.register(cors, {
      origin: true,
    });

    // Starting the telemetry loop to generate sensor readings every 5 seconds
    startTelemetryLoop();

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
