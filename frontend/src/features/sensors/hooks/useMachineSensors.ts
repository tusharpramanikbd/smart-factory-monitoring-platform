import type { SensorReading } from "@/types/sensor.types";
import { useEffect, useState } from "react";

interface SensorUpdateMessage {
  type: "sensor-update";
  data: SensorReading[];
}

export function useMachineSensors(machineId: string) {
  const [sensorReading, setSensorReading] = useState<
    SensorReading | undefined
  >();

  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  useEffect(() => {
    if (!machineId) {
      return;
    }

    const socket = new WebSocket(`ws://localhost:5000/ws/sensors/${machineId}`);

    socket.onopen = () => {
      setConnectionStatus("connected");
    };

    socket.onclose = () => {
      setConnectionStatus("disconnected");
    };

    socket.onerror = () => {
      setConnectionStatus("disconnected");
    };

    socket.onmessage = (event) => {
      const message: SensorUpdateMessage = JSON.parse(event.data);

      setSensorReading(message.data[0]);
    };

    return () => {
      socket.close();
    };
  }, [machineId]);

  return {
    sensorReading,
    connectionStatus,
  };
}
