import { useQuery } from "@tanstack/react-query";
import { getMachineSensorReading } from "@/services/sensor.service";

export function useSensorReading(machineId: string) {
  const {
    data: sensorReading,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["sensor-reading", machineId],
    queryFn: () => getMachineSensorReading(machineId),
    enabled: !!machineId,

    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  return {
    sensorReading,
    loading,
    error,
  };
}
