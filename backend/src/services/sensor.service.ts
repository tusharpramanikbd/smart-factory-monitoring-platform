import { machines } from "../data/machines";
import { generateSensorReading } from "../simulators/sensor.simulator";

export function getCurrentSensorReadings() {
  return machines.map((machine) => generateSensorReading(machine.id));
}

export function getCurrentSensorReading(machineId: string) {
  return generateSensorReading(machineId);
}
