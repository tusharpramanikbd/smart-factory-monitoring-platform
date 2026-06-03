export type MachineOperationalState = "idle" | "starting" | "running";

export type MachineHealthState = "healthy" | "warning" | "failing";

export interface MachineStateProfile {
  temperature: number;
  vibration: number;
  powerUsage: number;
  rpm: number;
  pressure: number;
}
