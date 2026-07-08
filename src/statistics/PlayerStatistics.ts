import type {
  HeadToHeadStatistics,
  PlayerStatistics as PlayerStatisticsData,
  RecentPlayerMatch,
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

  toOverview(): PlayerStatisticsData {
    return this.player;
  }
}
