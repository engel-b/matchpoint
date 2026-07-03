import { useEffect, useState } from "react";

import type { ControlAction } from "../types/controls";

export function useKeyCapture(onCaptured: (action: ControlAction, key: string) => void) {
  const [capturingAction, setCapturingAction] = useState<ControlAction | null>(null);

  useEffect(() => {
    if (!capturingAction) return;

    const action = capturingAction;

    function handleKeyDown(event: KeyboardEvent) {
      event.preventDefault();
      onCaptured(action, event.key);
      setCapturingAction(null);
    }

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [capturingAction, onCaptured]);

  return {
    capturingAction,
    startCapture: setCapturingAction,
    cancelCapture: () => setCapturingAction(null),
  };
}
