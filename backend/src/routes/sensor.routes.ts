import { FastifyInstance } from "fastify";
import {
  getSensorReadings,
  getMachineSensorReading,
} from "../controllers/sensor.controller";

export async function sensorRoutes(app: FastifyInstance) {
  app.get("/sensor-readings", getSensorReadings);
  app.get("/machines/:id/sensor-reading", getMachineSensorReading);
}
