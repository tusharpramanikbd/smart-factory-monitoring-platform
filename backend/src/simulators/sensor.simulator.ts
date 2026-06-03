import { SensorReading } from "../types/sensor-reading.types";
import { machineRuntimes } from "../data/machine-runtimes";
import { MACHINE_HEALTH_PROFILES } from "../constants/machine-health-profiles";
import { MachineHealthState } from "../types/machine-state.types";
import { HEALTH_DEGRADATION_RATE } from "../constants/machine-simulation.constants";

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

function getHealthState(health: number): MachineHealthState {
  if (health >= 80) {
    return "healthy";
  }

  if (health >= 50) {
    return "warning";
  }

  return "failing";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function generateSensorReading(machineId: string): SensorReading {
  const runtime = machineRuntimes.find(
    (machine) => machine.machineId === machineId,
  );

  if (!runtime) {
    throw new Error(`Runtime not found for machine ${machineId}`);
  }

  const now = Date.now();

  const elapsedSeconds = (now - runtime.lastUpdated) / 1000;

  //Health degradation
  runtime.health = clamp(
    runtime.health - elapsedSeconds * HEALTH_DEGRADATION_RATE,
    0,
    100,
  );

  const healthState = getHealthState(runtime.health);

  const profile = MACHINE_HEALTH_PROFILES[healthState];

  // Temperature
  runtime.temperature = moveTowards(
    runtime.temperature,
    profile.temperature,
    elapsedSeconds * 0.5,
  );

  const temperatureFactor = runtime.temperature / profile.temperature;

  // Vibration
  const targetVibration =
    profile.vibration * (1 + (temperatureFactor - 1) * 0.5);

  runtime.vibration = moveTowards(
    runtime.vibration,
    targetVibration,
    elapsedSeconds * 0.08,
  );

  // Power Usage
  const targetPowerUsage = profile.powerUsage * temperatureFactor;

  runtime.powerUsage = moveTowards(
    runtime.powerUsage,
    targetPowerUsage,
    elapsedSeconds * 0.15,
  );

  // RPM
  runtime.rpm = moveTowards(runtime.rpm, profile.rpm, elapsedSeconds * 20);

  // Pressure
  const targetPressure = profile.pressure * (1 + (temperatureFactor - 1) * 0.3);

  runtime.pressure = moveTowards(
    runtime.pressure,
    targetPressure,
    elapsedSeconds * 0.3,
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
