import { machines } from "../data/machines";

export function getAllMachines() {
  return machines;
}

export function getMachineById(id: string) {
  return machines.find((machine) => machine.id === id);
}
