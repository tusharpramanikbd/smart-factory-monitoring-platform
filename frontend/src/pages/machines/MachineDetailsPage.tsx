import { useParams } from "react-router";
import { useMachine } from "@/features/machines/hooks/useMachine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function MachineDetailsPage() {
  const { id } = useParams();

  const { machine, loading, error } = useMachine(id ?? "");

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
      <Button variant="outline" className="mb-4" onClick={() => navigate("/")}>
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
        </CardContent>
      </Card>
    </div>
  );
}
