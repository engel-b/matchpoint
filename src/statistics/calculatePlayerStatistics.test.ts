import { describe, expect, it } from "vitest";

import { calculatePlayerStatistics } from "./calculatePlayerStatistics";

import type { MatchResult } from "../types/match";

const firstMatch: MatchResult = {
  id: "match-1",
  startedAt: "2026-01-01T10:00:00.000Z",
  finishedAt: "2026-01-01T10:15:00.000Z",
  player1Id: "player-paula",
  player1Name: "Paula",
  player2Id: "player-paul",
  player2Name: "Paul",
  winnerId: "player-paula",
  setsToWin: 3,
  player1Sets: 3,
  player2Sets: 1,
  sets: [
    { player1: 11, player2: 8, winner: "player1" },
    { player1: 7, player2: 11, winner: "player2" },
    { player1: 11, player2: 9, winner: "player1" },
    { player1: 12, player2: 10, winner: "player1" },
  ],
};

const secondMatch: MatchResult = {
  id: "match-2",
  startedAt: "2026-01-02T10:00:00.000Z",
  finishedAt: "2026-01-02T10:15:00.000Z",
  player1Id: "player-paul",
  player1Name: "Paul",
  player2Id: "player-paula",
  player2Name: "Paula",
  winnerId: "player-paul",
  setsToWin: 3,
  player1Sets: 3,
  player2Sets: 0,
  sets: [
    { player1: 11, player2: 6, winner: "player1" },
    { player1: 11, player2: 5, winner: "player1" },
    { player1: 11, player2: 9, winner: "player1" },
  ],
};

describe("calculatePlayerStatistics", () => {
  it("returns an empty list when there are no matches", () => {
    expect(calculatePlayerStatistics([])).toEqual([]);
  });

  it("calculates matches, wins, sets and points for every player", () => {
    expect(calculatePlayerStatistics([firstMatch, secondMatch])).toEqual([
      {
        playerId: "player-paul",
        playerName: "Paul",
        matches: 2,
        wins: 1,
        losses: 1,
        setsWon: 4,
        setsLost: 3,
        pointsWon: 71,
        pointsLost: 61,
        winRate: 0.5,
      },
      {
        playerId: "player-paula",
        playerName: "Paula",
        matches: 2,
        wins: 1,
        losses: 1,
        setsWon: 3,
        setsLost: 4,
        pointsWon: 61,
        pointsLost: 71,
        winRate: 0.5,
      },
    ]);
  });
});
