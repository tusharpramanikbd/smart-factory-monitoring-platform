import { useQuery } from "@tanstack/react-query";
import { getMachines } from "@/services/machine.service";
import { QUERY_KEYS } from "@/lib/query-keys";

export function useMachines() {
  const {
    data: machines = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.MACHINES,
    queryFn: getMachines,
  });

  return {
    machines,
    loading,
    error,
  };
}
