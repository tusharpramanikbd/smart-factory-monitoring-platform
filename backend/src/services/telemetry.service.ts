import { TELEMETRY_INTERVAL_MS } from "../constants/telemetry.constants";
import { machines } from "../data/machines";
import { generateSensorReading } from "../simulators/sensor.simulator";
import { SensorReading } from "../types/sensor-reading.types";
import { TelemetryUpdateMessage } from "../types/websocket-message.types";
import { broadcast } from "./websocket.service";

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

  const message: TelemetryUpdateMessage = {
    type: "telemetry-update",
    data: getLatestReadings(),
  };

  broadcast(message);
}

export function getLatestReadings(): SensorReading[] {
  return Array.from(latestReadings.values());
}

export function getLatestReading(machineId: string): SensorReading | undefined {
  return latestReadings.get(machineId);
}
