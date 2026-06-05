import { WebSocket } from "ws";

const machineSubscriptions = new Map<string, Set<WebSocket>>();

export function addClient(machineId: string, client: WebSocket) {
  const clients = machineSubscriptions.get(machineId);

  if (clients) {
    clients.add(client);

    return;
  }

  machineSubscriptions.set(machineId, new Set([client]));
}

export function removeClient(machineId: string, client: WebSocket) {
  const clients = machineSubscriptions.get(machineId);

  if (!clients) {
    return;
  }

  clients.delete(client);

  if (clients.size === 0) {
    machineSubscriptions.delete(machineId);
  }
}

export function broadcastToMachine(machineId: string, data: unknown) {
  const clients = machineSubscriptions.get(machineId);

  if (!clients) {
    return;
  }

  const message = JSON.stringify(data);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

export function getConnectedClientCount() {
  let count = 0;

  machineSubscriptions.forEach((clients) => {
    count += clients.size;
  });

  return count;
}
