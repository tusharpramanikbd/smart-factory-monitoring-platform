import { FastifyInstance } from "fastify";
import { machines } from "../data/machines";

export async function machineRoutes(app: FastifyInstance) {
  app.get("/machines", async () => {
    return machines;
  });
}
