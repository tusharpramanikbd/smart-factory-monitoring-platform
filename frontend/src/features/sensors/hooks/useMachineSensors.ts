import type { SensorReading } from "@/types/sensor.types";
import { useEffect, useState } from "react";

interface SensorUpdateMessage {
  type: "sensor-update";
  data: SensorReading[];
}

type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

const RECONNECT_DELAY_MS = 1000;

export function useMachineSensors(machineId: string) {
  const [sensorReading, setSensorReading] = useState<
    SensorReading | undefined
  >();

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  useEffect(() => {
    if (!machineId) {
      return;
    }

    let socket: WebSocket | null = null;

    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    let isUnmounted = false;

    let hasConnectedBefore = false;

    function connect() {
      if (!hasConnectedBefore) {
        setConnectionStatus("connecting");
      }

      socket = new WebSocket(`ws://localhost:5000/ws/sensors/${machineId}`);

      socket.onopen = () => {
        hasConnectedBefore = true;

        setConnectionStatus("connected");
      };

      socket.onmessage = (event) => {
        const message: SensorUpdateMessage = JSON.parse(event.data);

        setSensorReading(message.data[0]);
      };

      socket.onerror = () => {
        console.error("WebSocket connection error");
      };

      socket.onclose = () => {
        if (isUnmounted) {
          setConnectionStatus("disconnected");

          return;
        }

        setConnectionStatus("reconnecting");

        reconnectTimeout = setTimeout(() => {
          connect();
        }, RECONNECT_DELAY_MS);
      };
    }

    connect();

    return () => {
      isUnmounted = true;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      socket?.close();
    };
  }, [machineId]);

  return {
    sensorReading,
    connectionStatus,
  };
}
