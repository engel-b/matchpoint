import type { MatchResult } from "../types/match";

export type HeadToHeadStatistics = {
  opponentId: string;
  opponentName: string;
  matches: number;
  wins: number;
  losses: number;
  setsWon: number;
  setsLost: number;
  pointsWon: number;
  pointsLost: number;
  winRate: number;
};

type MutableHeadToHeadStatistics = Omit<HeadToHeadStatistics, "winRate">;

export function calculateHeadToHeadStatistics(
  matches: MatchResult[],
  playerId: string
): HeadToHeadStatistics[] {
  const statisticsByOpponentId = new Map<string, MutableHeadToHeadStatistics>();

  for (const match of matches) {
    const playerSide = getPlayerSide(match, playerId);

    if (!playerSide) continue;

    const opponent = getOpponent(match, playerSide);
    const statistics = getOrCreateStatistics(statisticsByOpponentId, opponent);

    statistics.matches += 1;

    if (match.winnerId === playerId) {
      statistics.wins += 1;
    } else {
      statistics.losses += 1;
    }

    const playerSets = playerSide === "player1" ? match.player1Sets : match.player2Sets;
    const opponentSets = playerSide === "player1" ? match.player2Sets : match.player1Sets;

    statistics.setsWon += playerSets;
    statistics.setsLost += opponentSets;

    for (const set of match.sets) {
      const playerPoints = playerSide === "player1" ? set.player1 : set.player2;
      const opponentPoints = playerSide === "player1" ? set.player2 : set.player1;

      statistics.pointsWon += playerPoints;
      statistics.pointsLost += opponentPoints;
    }
  }

  return [...statisticsByOpponentId.values()]
    .map((statistics) => ({
      ...statistics,
      winRate: calculateWinRate(statistics.wins, statistics.matches),
    }))
    .sort(compareHeadToHeadStatistics);
}

function getPlayerSide(match: MatchResult, playerId: string): "player1" | "player2" | null {
  if (match.player1Id === playerId) return "player1";
  if (match.player2Id === playerId) return "player2";

  return null;
}

function getOpponent(
  match: MatchResult,
  playerSide: "player1" | "player2"
): { opponentId: string; opponentName: string } {
  if (playerSide === "player1") {
    return {
      opponentId: match.player2Id,
      opponentName: match.player2Name,
    };
  }

  return {
    opponentId: match.player1Id,
    opponentName: match.player1Name,
  };
}

function getOrCreateStatistics(
  statisticsByOpponentId: Map<string, MutableHeadToHeadStatistics>,
  opponent: { opponentId: string; opponentName: string }
): MutableHeadToHeadStatistics {
  const existingStatistics = statisticsByOpponentId.get(opponent.opponentId);

  if (existingStatistics) {
    existingStatistics.opponentName = opponent.opponentName;
    return existingStatistics;
  }

  const statistics: MutableHeadToHeadStatistics = {
    opponentId: opponent.opponentId,
    opponentName: opponent.opponentName,
    matches: 0,
    wins: 0,
    losses: 0,
    setsWon: 0,
    setsLost: 0,
    pointsWon: 0,
    pointsLost: 0,
  };

  statisticsByOpponentId.set(opponent.opponentId, statistics);

  return statistics;
}

function calculateWinRate(wins: number, matches: number): number {
  if (matches === 0) return 0;

  return wins / matches;
}

function compareHeadToHeadStatistics(
  left: HeadToHeadStatistics,
  right: HeadToHeadStatistics
): number {
  if (right.matches !== left.matches) return right.matches - left.matches;
  if (right.wins !== left.wins) return right.wins - left.wins;

  return left.opponentName.localeCompare(right.opponentName);
}
