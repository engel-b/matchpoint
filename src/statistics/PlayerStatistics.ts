import type {
  HeadToHeadStatistics,
  PlayerStatistics as PlayerStatisticsData,
  RecentPlayerMatch,
  PlayerStreak,
} from "./types";
import type { MatchResult } from "../types/match";

export class PlayerStatistics {
  private readonly player: PlayerStatisticsData;
  private readonly opponents: HeadToHeadStatistics[];
  private readonly recentMatchesList: MatchResult[];

  constructor(
    player: PlayerStatisticsData,
    headToHead: HeadToHeadStatistics[],
    recentMatches: MatchResult[]
  ) {
    this.player = player;
    this.opponents = headToHead;
    this.recentMatchesList = recentMatches;
  }

  get id(): string {
    return this.player.playerId;
  }

  get name(): string {
    return this.player.playerName;
  }

  get matches(): number {
    return this.player.matches;
  }

  get wins(): number {
    return this.player.wins;
  }

  get losses(): number {
    return this.player.losses;
  }

  get winRate(): number {
    return this.player.winRate;
  }

  get setsWon(): number {
    return this.player.setsWon;
  }

  get setsLost(): number {
    return this.player.setsLost;
  }

  get setDifference(): number {
    return this.player.setDifference;
  }

  get pointsWon(): number {
    return this.player.pointsWon;
  }

  get pointsLost(): number {
    return this.player.pointsLost;
  }

  get pointDifference(): number {
    return this.player.pointDifference;
  }

  get headToHead(): HeadToHeadStatistics[] {
    return this.opponents;
  }

  get recentMatches(): readonly MatchResult[] {
    return this.recentMatchesList;
  }

  get recentResults(): RecentPlayerMatch[] {
    return this.recentMatchesList.map((match) => {
      const isPlayer1 = match.player1Id === this.id;

      return {
        matchId: match.id,
        opponentName: isPlayer1 ? match.player2Name : match.player1Name,
        setsWon: isPlayer1 ? match.player1Sets : match.player2Sets,
        setsLost: isPlayer1 ? match.player2Sets : match.player1Sets,
        won: match.winnerId === this.id,
      };
    });
  }

  get currentStreak(): PlayerStreak {
    if (this.recentMatchesList.length === 0) {
      return { type: "none", count: 0 };
    }

    const firstMatchWon = this.recentMatchesList[0].winnerId === this.id;
    let count = 0;

    for (const match of this.recentMatchesList) {
      const won = match.winnerId === this.id;

      if (won !== firstMatchWon) break;

      count += 1;
    }

    return {
      type: firstMatchWon ? "win" : "loss",
      count,
    };
  }

  get longestWinningStreak(): number {
    let longestStreak = 0;
    let currentStreak = 0;

    for (const match of [...this.recentMatchesList].reverse()) {
      if (match.winnerId === this.id) {
        currentStreak += 1;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return longestStreak;
  }

  get mostPlayedOpponent(): HeadToHeadStatistics | null {
    if (this.opponents.length === 0) return null;

    return this.opponents[0];
  }

  get bestOpponent(): HeadToHeadStatistics | null {
    if (this.opponents.length === 0) return null;

    return [...this.opponents].sort((left, right) => {
      if (right.wins !== left.wins) return right.wins - left.wins;
      if (right.winRate !== left.winRate) return right.winRate - left.winRate;

      return left.opponentName.localeCompare(right.opponentName);
    })[0];
  }

  toOverview(): PlayerStatisticsData {
    return this.player;
  }
}
