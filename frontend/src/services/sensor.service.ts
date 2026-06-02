import { api } from "./api";
import type { SensorReading } from "@/types/sensor.types";

export async function getMachineSensorReading(machineId: string) {
  const response = await api.get<SensorReading>(
    `/machines/${machineId}/sensor-reading`,
  );

  return response.data;
}
