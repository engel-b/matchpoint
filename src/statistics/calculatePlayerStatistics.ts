import type { MatchResult } from "../types/match";

export type PlayerStatistics = {
  playerId: string;
  playerName: string;
  matches: number;
  wins: number;
  losses: number;
  setsWon: number;
  setsLost: number;
  pointsWon: number;
  pointsLost: number;
  winRate: number;
};

type MutablePlayerStatistics = Omit<PlayerStatistics, "winRate">;

export function calculatePlayerStatistics(matches: MatchResult[]): PlayerStatistics[] {
  const statisticsByPlayerId = new Map<string, MutablePlayerStatistics>();

  for (const match of matches) {
    const player1Statistics = getOrCreatePlayerStatistics(statisticsByPlayerId, {
      playerId: match.player1Id,
      playerName: match.player1Name,
    });

    const player2Statistics = getOrCreatePlayerStatistics(statisticsByPlayerId, {
      playerId: match.player2Id,
      playerName: match.player2Name,
    });

    player1Statistics.matches += 1;
    player2Statistics.matches += 1;

    if (match.winnerId === match.player1Id) {
      player1Statistics.wins += 1;
      player2Statistics.losses += 1;
    } else {
      player2Statistics.wins += 1;
      player1Statistics.losses += 1;
    }

    player1Statistics.setsWon += match.player1Sets;
    player1Statistics.setsLost += match.player2Sets;
    player2Statistics.setsWon += match.player2Sets;
    player2Statistics.setsLost += match.player1Sets;

    for (const set of match.sets) {
      player1Statistics.pointsWon += set.player1;
      player1Statistics.pointsLost += set.player2;
      player2Statistics.pointsWon += set.player2;
      player2Statistics.pointsLost += set.player1;
    }
  }

  return [...statisticsByPlayerId.values()]
    .map((statistics) => ({
      ...statistics,
      winRate: calculateWinRate(statistics.wins, statistics.matches),
    }))
    .sort(comparePlayerStatistics);
}

function getOrCreatePlayerStatistics(
  statisticsByPlayerId: Map<string, MutablePlayerStatistics>,
  player: { playerId: string; playerName: string }
): MutablePlayerStatistics {
  const existingStatistics = statisticsByPlayerId.get(player.playerId);

  if (existingStatistics) {
    existingStatistics.playerName = player.playerName;
    return existingStatistics;
  }

  const statistics: MutablePlayerStatistics = {
    playerId: player.playerId,
    playerName: player.playerName,
    matches: 0,
    wins: 0,
    losses: 0,
    setsWon: 0,
    setsLost: 0,
    pointsWon: 0,
    pointsLost: 0,
  };

  statisticsByPlayerId.set(player.playerId, statistics);

  return statistics;
}

function calculateWinRate(wins: number, matches: number): number {
  if (matches === 0) return 0;

  return wins / matches;
}

function comparePlayerStatistics(left: PlayerStatistics, right: PlayerStatistics): number {
  if (right.wins !== left.wins) return right.wins - left.wins;
  if (right.winRate !== left.winRate) return right.winRate - left.winRate;

  return left.playerName.localeCompare(right.playerName);
}
