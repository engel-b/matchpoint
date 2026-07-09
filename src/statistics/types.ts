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
  setDifference: number;
  pointDifference: number;
};

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

export type PlayerStatisticsDetails = {
  player: PlayerStatistics;
  headToHead: HeadToHeadStatistics[];
};

export type RecentPlayerMatch = {
  matchId: string;
  opponentName: string;
  setsWon: number;
  setsLost: number;
  won: boolean;
};

export type PlayerStreak = {
  type: "win" | "loss" | "none";
  count: number;
};
