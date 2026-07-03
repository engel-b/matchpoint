export type ControlAction = "player1Point" | "player2Point" | "undo";

export type KeyBindings = {
  player1Point: string[];
  player2Point: string[];
  undo: string[];
};

export const DEFAULT_KEY_BINDINGS: KeyBindings = {
  player1Point: ["AudioVolumeDown", "PageDown"],
  player2Point: ["AudioVolumeUp", "PageUp"],
  undo: ["Escape", "Backspace"],
};
