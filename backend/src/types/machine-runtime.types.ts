import { MachineOperationalState } from "./machine-state.types";

export interface MachineRuntime {
  machineId: string;

  operationalState: MachineOperationalState;

  health: number;

  temperature: number;
  vibration: number;
  powerUsage: number;
  rpm: number;
  pressure: number;

  lastUpdated: number;
}
