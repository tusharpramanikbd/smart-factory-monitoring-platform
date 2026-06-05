import { SensorReading } from "./sensor-reading.types";

export interface SensorUpdateMessage {
  type: "sensor-update";
  data: SensorReading[];
}
