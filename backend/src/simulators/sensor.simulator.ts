import { SensorReading } from "../types/sensor-reading.types";

export function generateSensorReading(machineId: string): SensorReading {
  return {
    machineId,
    temperature: Number((60 + Math.random() * 20).toFixed(2)),
    vibration: Number((0.1 + Math.random() * 0.5).toFixed(2)),
    powerUsage: Number((10 + Math.random() * 10).toFixed(2)),
    rpm: Math.floor(1200 + Math.random() * 500),
    pressure: Number((2 + Math.random()).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}
