import { FastifyInstance } from "fastify";
import { addClient, removeClient } from "../services/websocket.service";

export async function telemetryRoutes(app: FastifyInstance) {
  app.get("/ws/telemetry", { websocket: true }, (socket) => {
    console.log("Client connected");

    addClient(socket);

    socket.on("close", () => {
      console.log("Client disconnected");

      removeClient(socket);
    });
  });
}
