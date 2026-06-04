import { SensorReading } from "./sensor-reading.types";

export interface TelemetryUpdateMessage {
  type: "telemetry-update";
  data: SensorReading[];
}
