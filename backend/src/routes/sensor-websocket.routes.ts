import { FastifyInstance } from "fastify";

import { addClient, removeClient } from "../services/websocket.service";

import { MachineWebSocketParams } from "../types/websocket-route.types";

export async function sensorWebSocketRoutes(app: FastifyInstance) {
  app.get("/ws/sensors/:machineId", { websocket: true }, (socket, request) => {
    const { machineId } = request.params as MachineWebSocketParams;

    console.log(`Client connected to machine ${machineId}`);

    addClient(machineId, socket);

    socket.on("close", () => {
      console.log(`Client disconnected from machine ${machineId}`);

      removeClient(machineId, socket);
    });
  });
}
