import { comparePlayerStatistics } from "./compare";
import { calculateHeadToHead } from "./headToHead";
import { calculateWinRate } from "./helpers";
import { PlayerStatistics } from "./PlayerStatistics";

import type { HeadToHeadStatistics, PlayerStatistics as PlayerStatisticsData } from "./types";
import type { MatchResult } from "../types/match";

type MutablePlayerStatistics = Omit<
  PlayerStatisticsData,
  "winRate" | "setDifference" | "pointDifference"
>;

export class MatchStatistics {
  private readonly matchesByPlayerId = new Map<string, MatchResult[]>();
  private readonly playersById = new Map<string, MutablePlayerStatistics>();

  constructor(matches: MatchResult[]) {
    this.build(matches);
  }

  get players(): PlayerStatisticsData[] {
    return [...this.playersById.values()]
      .map((statistics) => ({
        ...statistics,
        winRate: calculateWinRate(statistics.wins, statistics.matches),
        setDifference: statistics.setsWon - statistics.setsLost,
        pointDifference: statistics.pointsWon - statistics.pointsLost,
      }))
      .sort(comparePlayerStatistics);
  }

  getHeadToHead(playerId: string): HeadToHeadStatistics[] {
    return calculateHeadToHead(this.matchesByPlayerId.get(playerId) ?? [], playerId);
  }

  getPlayer(playerId: string): PlayerStatistics | null {
    const player = this.players.find((entry) => entry.playerId === playerId);

    if (!player) return null;

    return new PlayerStatistics(
      player,
      this.getHeadToHead(playerId),
      this.getRecentMatches(playerId)
    );
  }

  private build(matches: MatchResult[]) {
    for (const match of matches) {
      const player1Statistics = this.getOrCreatePlayer(match.player1Id, match.player1Name);
      const player2Statistics = this.getOrCreatePlayer(match.player2Id, match.player2Name);

      player1Statistics.matches += 1;
      player2Statistics.matches += 1;

      this.addMatchForPlayer(match.player1Id, match);
      this.addMatchForPlayer(match.player2Id, match);

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
  }

  private getOrCreatePlayer(playerId: string, playerName: string): MutablePlayerStatistics {
    const existingStatistics = this.playersById.get(playerId);

    if (existingStatistics) {
      existingStatistics.playerName = playerName;
      return existingStatistics;
    }

    const statistics: MutablePlayerStatistics = {
      playerId,
      playerName,
      matches: 0,
      wins: 0,
      losses: 0,
      setsWon: 0,
      setsLost: 0,
      pointsWon: 0,
      pointsLost: 0,
    };

    this.playersById.set(playerId, statistics);

    return statistics;
  }

  private addMatchForPlayer(playerId: string, match: MatchResult) {
    const playerMatches = this.matchesByPlayerId.get(playerId) ?? [];
    playerMatches.push(match);
    this.matchesByPlayerId.set(playerId, playerMatches);
  }

  private getRecentMatches(playerId: string): MatchResult[] {
    return [...(this.matchesByPlayerId.get(playerId) ?? [])].sort(
      (left, right) => new Date(right.finishedAt).getTime() - new Date(left.finishedAt).getTime()
    );
  }
}
