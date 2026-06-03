import { SensorReading } from "../types/sensor-reading.types";
import { machineRuntimes } from "../data/machine-runtimes";
import { MACHINE_STATE_PROFILES } from "../constants/machine-state-profiles";

function moveTowards(current: number, target: number, maxStep: number) {
  const difference = target - current;

  if (Math.abs(difference) <= maxStep) {
    return target;
  }

  return current + Math.sign(difference) * maxStep;
}

function addNoise(value: number, noiseRange: number) {
  return value + (Math.random() * 2 - 1) * noiseRange;
}

export function generateSensorReading(machineId: string): SensorReading {
  const runtime = machineRuntimes.find(
    (machine) => machine.machineId === machineId,
  );

  if (!runtime) {
    throw new Error(`Runtime not found for machine ${machineId}`);
  }

  const profile = MACHINE_STATE_PROFILES[runtime.state];

  const now = Date.now();

  const elapsedSeconds = (now - runtime.lastUpdated) / 1000;

  runtime.temperature = moveTowards(
    runtime.temperature,
    profile.temperature,
    elapsedSeconds * 0.5,
  );

  runtime.vibration = moveTowards(
    runtime.vibration,
    profile.vibration,
    elapsedSeconds * 0.05,
  );

  runtime.powerUsage = moveTowards(
    runtime.powerUsage,
    profile.powerUsage,
    elapsedSeconds * 0.1,
  );

  runtime.rpm = moveTowards(runtime.rpm, profile.rpm, elapsedSeconds * 20);

  runtime.pressure = moveTowards(
    runtime.pressure,
    profile.pressure,
    elapsedSeconds * 0.5,
  );

  runtime.lastUpdated = now;

  return {
    machineId,

    temperature: Number(addNoise(runtime.temperature, 0.4).toFixed(2)),

    vibration: Number(addNoise(runtime.vibration, 0.05).toFixed(2)),

    powerUsage: Number(addNoise(runtime.powerUsage, 0.15).toFixed(2)),

    rpm: Math.round(addNoise(runtime.rpm, 15)),

    pressure: Number(addNoise(runtime.pressure, 0.3).toFixed(2)),

    timestamp: new Date().toISOString(),
  };
}
