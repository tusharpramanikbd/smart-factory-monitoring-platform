import { useParams } from "react-router";
import { useMachine } from "@/features/machines/hooks/useMachine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/shared/MetricCard";
import { useMachineSensors } from "@/features/sensors/hooks/useMachineSensors";

export default function MachineDetailsPage() {
  const { id } = useParams();

  const { machine, loading, error } = useMachine(id ?? "");
  const { sensorReading, connectionStatus } = useMachineSensors(id ?? "");

  const navigate = useNavigate();

  if (loading) {
    return <div className="p-6">Loading machine details...</div>;
  }

  if (error) {
    return <div className="p-6">Failed to load machine.</div>;
  }

  if (!machine) {
    return <div className="p-6">Machine not found.</div>;
  }

  const temperatureStatus =
    sensorReading && sensorReading.temperature >= 70
      ? "critical"
      : sensorReading && sensorReading.temperature >= 60
        ? "warning"
        : "healthy";

  const vibrationStatus =
    sensorReading && sensorReading.vibration >= 0.8
      ? "critical"
      : sensorReading && sensorReading.vibration >= 0.5
        ? "warning"
        : "healthy";

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="outline"
        className="mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ArrowLeft />
        Back to Dashboard
      </Button>

      <h1 className="mb-6 text-3xl font-bold">Machine Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>{machine.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Machine ID</p>

            <p>{machine.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <StatusBadge status={machine.status} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Location</p>

            <p>{machine.location}</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="mb-2 font-semibold">Live Metrics</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              {connectionStatus === "connecting" && "🟡 Connecting..."}
              {connectionStatus === "connected" && "🟢 Live"}
              {connectionStatus === "disconnected" && "🔴 Disconnected"}
            </p>

            {!sensorReading ? (
              <p>Loading metrics...</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <MetricCard
                  label="Temperature"
                  value={`${sensorReading?.temperature} °C`}
                  status={temperatureStatus}
                />

                <MetricCard label="RPM" value={sensorReading?.rpm ?? "-"} />

                <MetricCard
                  label="Pressure"
                  value={sensorReading?.pressure ?? "-"}
                />

                <MetricCard
                  label="Power Usage"
                  value={`${sensorReading?.powerUsage} kW`}
                />

                <MetricCard
                  label="Vibration"
                  value={sensorReading?.vibration ?? "-"}
                  status={vibrationStatus}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
