import { TELEMETRY_INTERVAL_MS } from "../constants/telemetry.constants";
import { machines } from "../data/machines";
import { generateSensorReading } from "../simulators/sensor.simulator";
import { SensorReading } from "../types/sensor-reading.types";
import { TelemetryUpdateMessage } from "../types/websocket-message.types";
import { broadcastToMachine } from "./websocket.service";

const latestReadings = new Map<string, SensorReading>();

export function startTelemetryLoop() {
  updateTelemetry();

  setInterval(() => {
    updateTelemetry();
  }, TELEMETRY_INTERVAL_MS);
}

function updateTelemetry() {
  for (const machine of machines) {
    const reading = generateSensorReading(machine.id);

    latestReadings.set(machine.id, reading);
  }

  for (const machine of machines) {
    const reading = latestReadings.get(machine.id);

    if (!reading) {
      continue;
    }

    const message: TelemetryUpdateMessage = {
      type: "telemetry-update",
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
