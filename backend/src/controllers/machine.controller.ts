import { FastifyReply, FastifyRequest } from "fastify";
import { getAllMachines, getMachineById } from "../services/machine.service";
import { MachineParams } from "../types/machine-route.types";

export async function getMachines() {
  return getAllMachines();
}

export async function getMachine(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as MachineParams;

  const machine = getMachineById(id);

  if (!machine) {
    return reply.status(404).send({
      message: "Machine not found",
    });
  }

  return machine;
}
