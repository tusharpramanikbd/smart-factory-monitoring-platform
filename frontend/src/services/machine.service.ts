import { api } from "./api";
import type { Machine } from "../types/machine.types";

export async function getMachines() {
  const response = await api.get<Machine[]>("/machines");

  return response.data;
}

export async function getMachineById(id: string) {
  const response = await api.get<Machine>(`/machines/${id}`);

  return response.data;
}
