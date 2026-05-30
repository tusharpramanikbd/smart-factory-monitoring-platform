import { FastifyInstance } from "fastify";
import { machines } from "../data/machines";

export async function machineRoutes(app: FastifyInstance) {
  app.get("/machines", async () => {
    return machines;
  });

  app.get("/machines/:id", async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const machine = machines.find((machine) => machine.id === id);

    if (!machine) {
      return reply.status(404).send({
        message: "Machine not found",
      });
    }

    return machine;
  });
}
