import { useEffect, useState } from "react";

import { loadMatches } from "../storage/matchStorage";

import type { MatchResult } from "../types/match";

export function useMatchHistory(isOpen: boolean) {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function load() {
      setIsLoading(true);
      const loadedMatches = await loadMatches();
      setMatches(loadedMatches);
      setIsLoading(false);
    }

    void load();
  }, [isOpen]);

  return {
    matches,
    isLoading,
  };
}
