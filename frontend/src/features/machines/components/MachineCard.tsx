import type { Machine } from "@/types/machine.types";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{machine.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>
          <span className="font-medium">ID:</span> {machine.id}
        </p>

        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <StatusBadge status={machine.status} />
        </div>

        <p>
          <span className="font-medium">Location:</span> {machine.location}
        </p>
      </CardContent>
    </Card>
  );
}
