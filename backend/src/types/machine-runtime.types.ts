import { MachineState } from "./machine-state.types";

export interface MachineRuntime {
  machineId: string;

  state: MachineState;

  temperature: number;
  vibration: number;
  powerUsage: number;
  rpm: number;
  pressure: number;

  lastUpdated: number;
}
