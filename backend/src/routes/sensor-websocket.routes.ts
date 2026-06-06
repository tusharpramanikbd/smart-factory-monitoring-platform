import { FastifyInstance } from "fastify";

import { addClient, removeClient } from "../services/websocket.service";
import { getLatestReading } from "../services/sensor-stream.service";

import { MachineWebSocketParams } from "../types/websocket-route.types";
import { SensorUpdateMessage } from "../types/websocket-message.types";

export async function sensorWebSocketRoutes(app: FastifyInstance) {
  app.get("/ws/sensors/:machineId", { websocket: true }, (socket, request) => {
    const { machineId } = request.params as MachineWebSocketParams;

    console.log(`Client connected to machine ${machineId}`);

    addClient(machineId, socket);

    const latestReading = getLatestReading(machineId);

    if (latestReading) {
      const message: SensorUpdateMessage = {
        type: "sensor-update",
        data: [latestReading],
      };

      socket.send(JSON.stringify(message));
    }

    socket.on("close", () => {
      console.log(`Client disconnected from machine ${machineId}`);

      removeClient(machineId, socket);
    });
  });
}
