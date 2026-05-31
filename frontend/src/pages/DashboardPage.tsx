import { useMachines } from "@/hooks/useMachines";
import { MachineCard } from "@/components/ui/MachineCard";

export default function DashboardPage() {
  const { machines, loading } = useMachines();

  if (loading) {
    return <div>Loading machines...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Smart Factory Dashboard</h1>
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}
