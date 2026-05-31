import { FastifyInstance } from "fastify";
import { getMachines, getMachine } from "../controllers/machine.controller";

export async function machineRoutes(app: FastifyInstance) {
  app.get("/machines", getMachines);
  app.get("/machines/:id", getMachine);
}
