import type { SensorReading } from "@/types/sensor.types";
import { useEffect, useState } from "react";

interface TelemetryUpdateMessage {
  type: "telemetry-update";
  data: SensorReading[];
}

export function useMachineTelemetry(machineId: string) {
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

    const socket = new WebSocket("ws://localhost:5000/ws/telemetry");

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
      const message: TelemetryUpdateMessage = JSON.parse(event.data);

      const reading = message.data.find(
        (reading) => reading.machineId === machineId,
      );

      if (reading) {
        setSensorReading(reading);
      }
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
