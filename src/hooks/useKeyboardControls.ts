import { useEffect } from "react";

import type { KeyBindings } from "../types/controls";

type Args = {
  keyBindings: KeyBindings;
  disabled?: boolean;
  onPlayer1Point: () => void;
  onPlayer2Point: () => void;
  onUndo: () => void;
};

export function useKeyboardControls({
  keyBindings,
  disabled = false,
  onPlayer1Point,
  onPlayer2Point,
  onUndo,
}: Args) {
  useEffect(() => {
    if (disabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;

      if (keyBindings.player1Point.includes(key)) {
        event.preventDefault();
        onPlayer1Point();
        return;
      }

      if (keyBindings.player2Point.includes(key)) {
        event.preventDefault();
        onPlayer2Point();
        return;
      }

      if (keyBindings.undo.includes(key)) {
        event.preventDefault();
        onUndo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disabled, keyBindings, onPlayer1Point, onPlayer2Point, onUndo]);
}
