import type { PlayerId } from "./game";

export type MatchSet = {
  player1: number;
  player2: number;
  winner: PlayerId;
};

export type MatchResult = {
  id: string;

  startedAt: string;
  finishedAt: string;

  durationSeconds?: number;

  player1Id: string;
  player1Name: string;

  player2Id: string;
  player2Name: string;

  winnerId: string;

  setsToWin: number;

  player1Sets: number;
  player2Sets: number;

  sets: MatchSet[];
};
