import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";

import { healthRoutes } from "./routes/health.routes";
import { machineRoutes } from "./routes/machine.routes";
import { sensorRoutes } from "./routes/sensor.routes";
import { sensorWebSocketRoutes } from "./routes/sensor-websocket.routes";

import { startSensorUpdateLoop } from "./services/sensor-stream.service";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "Welcome to Smart Factory Monitoring Platform Backend",
  };
});

const start = async () => {
  try {
    await app.register(cors, {
      origin: "*",
    });

    await app.register(websocket);

    await app.register(healthRoutes);
    await app.register(machineRoutes);
    await app.register(sensorRoutes);
    await app.register(sensorWebSocketRoutes);

    // Starting the sensor update loop to generate sensor readings every 5 seconds
    startSensorUpdateLoop();

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
