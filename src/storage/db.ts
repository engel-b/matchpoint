import Dexie, { type Table } from "dexie";
import type { GameSettings, PlayerProfile } from "../types/game";
import type { Theme } from "../hooks/useAppStorage";

export type StoredAppState = {
  id: "app-state";
  theme: Theme;
  gameSettings: GameSettings;
  selectedProfileIds: {
    player1: string;
    player2: string;
  };
};

class TTScoreboardDatabase extends Dexie {
  profiles!: Table<PlayerProfile, string>;
  appState!: Table<StoredAppState, string>;

  constructor() {
    super("tt-scoreboard");

    this.version(2).stores({
      profiles: "id, name, createdAt",
      appState: "id",
    });
  }
}

export const db = new TTScoreboardDatabase();