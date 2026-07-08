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
