import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  status?: "healthy" | "warning" | "critical";
}

const statusClasses = {
  healthy: "border-green-500",
  warning: "border-yellow-500",
  critical: "border-red-500",
};

export function MetricCard({
  label,
  value,
  status = "healthy",
}: MetricCardProps) {
  return (
    <Card className={`border-l-4 ${statusClasses[status]}`}>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="mt-2 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
