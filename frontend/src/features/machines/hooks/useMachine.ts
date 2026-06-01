import { useQuery } from "@tanstack/react-query";
import { getMachineById } from "@/services/machine.service";

export function useMachine(id: string) {
  const {
    data: machine,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["machine", id],
    queryFn: () => getMachineById(id),
    enabled: !!id,
  });

  return {
    machine,
    loading,
    error,
  };
}
