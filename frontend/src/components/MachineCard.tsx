import type { Machine } from "../types/machine.types";

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  return (
    <div>
      <h3>{machine.name}</h3>
      <p>ID: {machine.id}</p>
      <p>Status: {machine.status}</p>
      <p>Location: {machine.location}</p>
      <hr />
    </div>
  );
}
