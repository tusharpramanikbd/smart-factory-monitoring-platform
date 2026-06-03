import { getLatestReading, getLatestReadings } from "./telemetry.service";

export function getCurrentSensorReadings() {
  return getLatestReadings();
}

export function getCurrentSensorReading(machineId: string) {
  return getLatestReading(machineId);
}
