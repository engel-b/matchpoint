import type { MatchResult, MatchSet } from "./match";

export type PlayerId = "player1" | "player2";

export type PlayerProfile = {
  id: string;
  name: string;
  createdAt: string;
};

export type PlayerState = {
  profileId: string;
  name: string;
  score: number;
  sets: number;
};

export type GameSettings = {
  setsToWin: number;
};

export type GameState = {
  startedAt: string;
  player1: PlayerState;
  player2: PlayerState;
  profiles: PlayerProfile[];

  firstServer: PlayerId;
  displaySwapped: boolean;

  roundWinner: PlayerId | null;
  matchWinner: PlayerId | null;
  completedMatch: MatchResult | null;

  sets: MatchSet[];
  history: PlayerId[];

  settings: GameSettings;
};
