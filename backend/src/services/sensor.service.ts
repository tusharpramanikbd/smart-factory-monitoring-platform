import { getLatestReading, getLatestReadings } from "./sensor-stream.service";

export function getCurrentSensorReadings() {
  return getLatestReadings();
}

export function getCurrentSensorReading(machineId: string) {
  return getLatestReading(machineId);
}
