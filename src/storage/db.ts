import Dexie, { type Table } from "dexie";
import type { PlayerProfile } from "../types/game";

export type AppSettings = {
  id: "settings";
  theme: "dark" | "light";
  setsToWin: number;
};

class TTScoreboardDatabase extends Dexie {
  profiles!: Table<PlayerProfile, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super("tt-scoreboard");

    this.version(1).stores({
      profiles: "id, name, createdAt",
      settings: "id",
    });
  }
}

export const db = new TTScoreboardDatabase();