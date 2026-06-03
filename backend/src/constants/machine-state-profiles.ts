import {
  MachineState,
  MachineStateProfile,
} from "../types/machine-state.types";

export const MACHINE_STATE_PROFILES: Record<MachineState, MachineStateProfile> =
  {
    idle: {
      temperature: 35,
      vibration: 0.2,
      powerUsage: 1,
      rpm: 0,
      pressure: 20,
    },

    starting: {
      temperature: 50,
      vibration: 0.8,
      powerUsage: 3,
      rpm: 1200,
      pressure: 60,
    },

    running: {
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
