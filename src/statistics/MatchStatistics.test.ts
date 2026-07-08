import { describe, expect, it } from "vitest";

import { MatchStatistics } from "./MatchStatistics";

import type { MatchResult } from "../types/match";

const matches: MatchResult[] = [
  {
    id: "match-1",
    startedAt: "2026-01-01T10:00:00.000Z",
    finishedAt: "2026-01-01T10:15:00.000Z",
    player1Id: "player-bjoern",
    player1Name: "Björn",
    player2Id: "player-anna",
    player2Name: "Anna",
    winnerId: "player-bjoern",
    setsToWin: 3,
    player1Sets: 3,
    player2Sets: 1,
    sets: [
      { player1: 11, player2: 8, winner: "player1" },
      { player1: 7, player2: 11, winner: "player2" },
      { player1: 11, player2: 9, winner: "player1" },
      { player1: 12, player2: 10, winner: "player1" },
    ],
  },
  {
    id: "match-2",
    startedAt: "2026-01-02T10:00:00.000Z",
    finishedAt: "2026-01-02T10:15:00.000Z",
    player1Id: "player-anna",
    player1Name: "Anna",
    player2Id: "player-bjoern",
    player2Name: "Björn",
    winnerId: "player-anna",
    setsToWin: 3,
    player1Sets: 3,
    player2Sets: 0,
    sets: [
      { player1: 11, player2: 6, winner: "player1" },
      { player1: 11, player2: 5, winner: "player1" },
      { player1: 11, player2: 9, winner: "player1" },
    ],
  },
];

describe("MatchStatistics", () => {
  it("calculates player statistics", () => {
    const statistics = new MatchStatistics(matches);

    expect(statistics.players).toEqual([
      {
        playerId: "player-anna",
        playerName: "Anna",
        matches: 2,
        wins: 1,
        losses: 1,
        setsWon: 4,
        setsLost: 3,
        pointsWon: 71,
        pointsLost: 61,
        winRate: 0.5,
        setDifference: 1,
        pointDifference: 10,
      },
      {
        playerId: "player-bjoern",
        playerName: "Björn",
        matches: 2,
        wins: 1,
        losses: 1,
        setsWon: 3,
        setsLost: 4,
        pointsWon: 61,
        pointsLost: 71,
        winRate: 0.5,
        setDifference: -1,
        pointDifference: -10,
      },
    ]);
  });

  it("calculates head-to-head statistics", () => {
    const statistics = new MatchStatistics(matches);

    expect(statistics.getHeadToHead("player-bjoern")).toEqual([
      {
        opponentId: "player-anna",
        opponentName: "Anna",
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

  it("returns an empty head-to-head list for unknown players", () => {
    const statistics = new MatchStatistics(matches);

    expect(statistics.getHeadToHead("unknown-player")).toEqual([]);
  });
});
