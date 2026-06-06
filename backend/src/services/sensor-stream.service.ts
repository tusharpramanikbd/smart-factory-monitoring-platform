import { SENSOR_UPDATE_INTERVAL_MS } from "../constants/sensor.constants";
import { machines } from "../data/machines";
import { generateSensorReading } from "../simulators/sensor.simulator";
import { SensorReading } from "@shared/types/sensor-reading.types";
import { SensorUpdateMessage } from "@shared/types/websocket-message.types";
import { broadcastToMachine } from "./websocket.service";

const latestReadings = new Map<string, SensorReading>();

export function startSensorUpdateLoop() {
  updateSensorReadings();

  setInterval(() => {
    updateSensorReadings();
  }, SENSOR_UPDATE_INTERVAL_MS);
}

function updateSensorReadings() {
  for (const machine of machines) {
    const reading = generateSensorReading(machine.id);

    latestReadings.set(machine.id, reading);
  }

  for (const machine of machines) {
    const reading = latestReadings.get(machine.id);

    if (!reading) {
      continue;
    }

    const message: SensorUpdateMessage = {
      type: "sensor-update",
      data: [reading],
    };

    broadcastToMachine(machine.id, message);
  }
}

export function getLatestReadings(): SensorReading[] {
  return Array.from(latestReadings.values());
}

export function getLatestReading(machineId: string): SensorReading | undefined {
  return latestReadings.get(machineId);
}
