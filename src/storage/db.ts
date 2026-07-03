import Dexie, { type Table } from "dexie";

import type { Language, SelectedProfileIds, Theme } from "../hooks/useAppStorage";
import type { KeyBindings } from "../types/controls";
import type { GameSettings, PlayerProfile } from "../types/game";
import type { MatchResult } from "../types/match";

export type StoredAppState = {
  id: "app-state";
  theme: Theme;
  language?: Language;
  gameSettings: GameSettings;
  selectedProfileIds?: SelectedProfileIds;
  keyBindings?: KeyBindings;
};

class TTScoreboardDatabase extends Dexie {
  profiles!: Table<PlayerProfile, string>;
  appState!: Table<StoredAppState, string>;
  matches!: Table<MatchResult, string>;

  constructor() {
    super("tt-scoreboard");

    this.version(2).stores({
      profiles: "id, name, createdAt",
      appState: "id",
    });

    this.version(3).stores({
      profiles: "id, name, createdAt",
      appState: "id",
      matches: "id, finishedAt, player1Id, player2Id, winnerId",
    });
  }
}

export const db = new TTScoreboardDatabase();
