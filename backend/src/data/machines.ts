import { Machine } from "../types/machine.types";

export const machines: Machine[] = [
  {
    id: "M-001",
    name: "CNC Machine 1",
    status: "healthy",
    location: "Factory Floor A",
  },
  {
    id: "M-002",
    name: "Assembly Robot 1",
    status: "warning",
    location: "Factory Floor B",
  },
  {
    id: "M-003",
    name: "Packaging Unit 1",
    status: "critical",
    location: "Factory Floor C",
  },
];
