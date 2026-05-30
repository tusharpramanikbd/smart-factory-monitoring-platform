export interface Machine {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical";
  location: string;
}
