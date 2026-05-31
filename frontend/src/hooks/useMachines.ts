import { useEffect, useState } from "react";

import type { Machine } from "../types/machine.types";
import { getMachines } from "../services/machine.service";

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMachines() {
      try {
        const data = await getMachines();

        setMachines(data);
      } finally {
        setLoading(false);
      }
    }

    loadMachines();
  }, []);

  return {
    machines,
    loading,
  };
}
