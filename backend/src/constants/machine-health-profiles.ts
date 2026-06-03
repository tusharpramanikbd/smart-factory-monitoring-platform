import {
  MachineHealthState,
  MachineStateProfile,
} from "../types/machine-state.types";

export const MACHINE_HEALTH_PROFILES: Record<
  MachineHealthState,
  MachineStateProfile
> = {
  healthy: {
    temperature: 75,
    vibration: 1.5,
    powerUsage: 5,
    rpm: 2500,
    pressure: 100,
  },

  warning: {
    temperature: 85,
    vibration: 4,
    powerUsage: 6.5,
    rpm: 2700,
    pressure: 110,
  },

  failing: {
    temperature: 100,
    vibration: 8,
    powerUsage: 8,
    rpm: 3000,
    pressure: 130,
  },
};
