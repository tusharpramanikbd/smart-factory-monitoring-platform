export type MachineState =
  | "idle"
  | "starting"
  | "running"
  | "warning"
  | "failing";

export interface MachineStateProfile {
  temperature: number;
  vibration: number;
  powerUsage: number;
  rpm: number;
  pressure: number;
}
