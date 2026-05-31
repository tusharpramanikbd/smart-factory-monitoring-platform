import { FastifyReply, FastifyRequest } from "fastify";
import { MachineParams } from "../types/machine-route.types";
import {
  getCurrentSensorReadings,
  getCurrentSensorReading,
} from "../services/sensor.service";
import { getMachineById } from "../services/machine.service";

export async function getSensorReadings() {
  return getCurrentSensorReadings();
}

export async function getMachineSensorReading(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as MachineParams;

  const machine = getMachineById(id);

  if (!machine) {
    return reply.status(404).send({
      message: "Machine not found",
    });
  }

  return getCurrentSensorReading(id);
}
