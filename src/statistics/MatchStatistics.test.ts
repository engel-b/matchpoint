import { describe, expect, it } from "vitest";

import { MatchStatistics } from "./MatchStatistics";

import type { MatchResult } from "../types/match";

const matches: MatchResult[] = [
  createMatch({
    id: "match-1",
    finishedAt: "2026-01-01T10:15:00.000Z",
    player1Id: "player-bjoern",
    player1Name: "Björn",
    player2Id: "player-anna",
    player2Name: "Anna",
    winnerId: "player-bjoern",
    player1Sets: 3,
    player2Sets: 1,
    sets: [
      { player1: 11, player2: 8, winner: "player1" },
      { player1: 7, player2: 11, winner: "player2" },
      { player1: 11, player2: 9, winner: "player1" },
      { player1: 12, player2: 10, winner: "player1" },
    ],
  }),
  createMatch({
    id: "match-2",
    finishedAt: "2026-01-02T10:15:00.000Z",
    player1Id: "player-anna",
    player1Name: "Anna",
    player2Id: "player-bjoern",
    player2Name: "Björn",
    winnerId: "player-anna",
    player1Sets: 3,
    player2Sets: 0,
    sets: [
      { player1: 11, player2: 6, winner: "player1" },
      { player1: 11, player2: 5, winner: "player1" },
      { player1: 11, player2: 9, winner: "player1" },
    ],
  }),
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

  it("returns player details", () => {
    const statistics = new MatchStatistics(matches);
    const player = statistics.getPlayer("player-bjoern");

    expect(player).not.toBeNull();
    expect(player?.id).toBe("player-bjoern");
    expect(player?.name).toBe("Björn");
    expect(player?.matches).toBe(2);
    expect(player?.wins).toBe(1);
    expect(player?.losses).toBe(1);
    expect(player?.headToHead).toHaveLength(1);
  });

  it("returns null for an unknown player", () => {
    const statistics = new MatchStatistics(matches);

    expect(statistics.getPlayer("unknown-player")).toBeNull();
  });

  it("calculates current streak and longest winning streak", () => {
    const statistics = new MatchStatistics(createStreakMatches());
    const player = statistics.getPlayer("player-bjoern");

    expect(player?.currentStreak).toEqual({
      type: "loss",
      count: 1,
    });

    expect(player?.longestWinningStreak).toBe(3);
  });

  it("limits recent matches to five and sorts them descending", () => {
    const statistics = new MatchStatistics(createStreakMatches());
    const player = statistics.getPlayer("player-bjoern");

    expect(player?.recentMatches.map((match) => match.id)).toEqual([
      "match-6",
      "match-5",
      "match-4",
      "match-3",
      "match-2",
    ]);
  });
});

function createStreakMatches(): MatchResult[] {
  return [
    createSimpleMatch("match-1", "2026-01-01T10:00:00.000Z", true),
    createSimpleMatch("match-2", "2026-01-02T10:00:00.000Z", false),
    createSimpleMatch("match-3", "2026-01-03T10:00:00.000Z", true),
    createSimpleMatch("match-4", "2026-01-04T10:00:00.000Z", true),
    createSimpleMatch("match-5", "2026-01-05T10:00:00.000Z", true),
    createSimpleMatch("match-6", "2026-01-06T10:00:00.000Z", false),
  ];
}

function createSimpleMatch(id: string, finishedAt: string, player1Won: boolean): MatchResult {
  return createMatch({
    id,
    finishedAt,
    player1Id: "player-bjoern",
    player1Name: "Björn",
    player2Id: "player-anna",
    player2Name: "Anna",
    winnerId: player1Won ? "player-bjoern" : "player-anna",
    player1Sets: player1Won ? 3 : 1,
    player2Sets: player1Won ? 1 : 3,
    sets: [
      { player1: 11, player2: 8, winner: "player1" },
      { player1: 8, player2: 11, winner: "player2" },
      {
        player1: player1Won ? 11 : 9,
        player2: player1Won ? 9 : 11,
        winner: player1Won ? "player1" : "player2",
      },
      {
        player1: player1Won ? 11 : 7,
        player2: player1Won ? 7 : 11,
        winner: player1Won ? "player1" : "player2",
      },
    ],
  });
}

function createMatch(match: Omit<MatchResult, "startedAt" | "setsToWin">): MatchResult {
  return {
    ...match,
    startedAt: match.finishedAt,
    setsToWin: 3,
  };
}
