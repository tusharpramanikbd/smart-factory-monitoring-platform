import { useParams } from "react-router";
import { useMachine } from "@/features/machines/hooks/useMachine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useSensorReading } from "@/features/sensors/hooks/useSensorReading";

export default function MachineDetailsPage() {
  const { id } = useParams();

  const { machine, loading, error } = useMachine(id ?? "");
  const { sensorReading, loading: sensorLoading } = useSensorReading(id ?? "");

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
            <h2 className="mb-4 font-semibold">Live Metrics</h2>

            {sensorLoading ? (
              <p>Loading metrics...</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p>{sensorReading?.temperature} °C</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">RPM</p>
                  <p>{sensorReading?.rpm}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p>{sensorReading?.pressure}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Power Usage</p>
                  <p>{sensorReading?.powerUsage} kW</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Vibration</p>
                  <p>{sensorReading?.vibration}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
