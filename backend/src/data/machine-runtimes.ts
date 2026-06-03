import { machines } from "./machines";
import { MachineRuntime } from "../types/machine-runtime.types";

export const machineRuntimes: MachineRuntime[] = machines.map((machine) => ({
  machineId: machine.id,

  health: 100,

  operationalState: "running",

  temperature: 75,
  vibration: 1.5,
  powerUsage: 5,
  rpm: 2500,
  pressure: 100,

  lastUpdated: Date.now(),
}));
