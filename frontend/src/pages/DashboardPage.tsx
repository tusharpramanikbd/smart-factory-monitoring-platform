import { MachineCard } from "@/features/machines/components/MachineCard";
import { KpiCard } from "@/components/shared/KpiCard";
import { useMachines } from "@/features/machines/hooks/useMachines";

export default function DashboardPage() {
  const { machines, loading, error } = useMachines();

  const totalMachines = machines.length;

  const healthyMachines = machines.filter(
    (machine) => machine.status === "healthy",
  ).length;

  const warningMachines = machines.filter(
    (machine) => machine.status === "warning",
  ).length;

  const criticalMachines = machines.filter(
    (machine) => machine.status === "critical",
  ).length;

  if (loading) {
    return <div>Loading machines...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p>Failed to load machine data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Smart Factory Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor machine health and operational status.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Total Machines"
          value={totalMachines}
          description="Machines in the factory"
        />
        <KpiCard
          title="Healthy"
          value={healthyMachines}
          description="Currently running"
        />
        <KpiCard
          title="Warning"
          value={warningMachines}
          description="Need attention"
        />
        <KpiCard
          title="Critical"
          value={criticalMachines}
          description="Currently stopped"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
