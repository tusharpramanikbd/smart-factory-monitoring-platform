interface StatusBadgeProps {
  status: "healthy" | "warning" | "critical";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span>{status.toUpperCase()}</span>;
}
