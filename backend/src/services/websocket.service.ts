import { WebSocket } from "ws";

const clients = new Set<WebSocket>();

export function addClient(client: WebSocket) {
  clients.add(client);
}

export function removeClient(client: WebSocket) {
  clients.delete(client);
}

export function getConnectedClientCount() {
  return clients.size;
}

export function broadcast(data: unknown) {
  const message = JSON.stringify(data);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
