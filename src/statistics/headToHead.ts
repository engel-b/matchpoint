import { compareHeadToHeadStatistics } from "./compare";
import { calculateWinRate } from "./helpers";
import { getOpponent, getPlayerSide } from "./matchHelpers";

import type { HeadToHeadStatistics } from "./types";
import type { MatchResult } from "../types/match";

type MutableHeadToHeadStatistics = Omit<HeadToHeadStatistics, "winRate">;

export function calculateHeadToHead(
  matches: MatchResult[],
  playerId: string
): HeadToHeadStatistics[] {
  const statisticsByOpponentId = new Map<string, MutableHeadToHeadStatistics>();

  for (const match of matches) {
    const playerSide = getPlayerSide(match, playerId);
    if (!playerSide) continue;

    const opponent = getOpponent(match, playerSide);
    const statistics = getOrCreateHeadToHeadStatistics(statisticsByOpponentId, opponent);

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
      statistics.pointsWon += playerSide === "player1" ? set.player1 : set.player2;
      statistics.pointsLost += playerSide === "player1" ? set.player2 : set.player1;
    }
  }

  return [...statisticsByOpponentId.values()]
    .map((statistics) => ({
      ...statistics,
      winRate: calculateWinRate(statistics.wins, statistics.matches),
    }))
    .sort(compareHeadToHeadStatistics);
}

function getOrCreateHeadToHeadStatistics(
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
