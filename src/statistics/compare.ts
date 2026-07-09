import type { HeadToHeadStatistics, PlayerStatistics } from "./types";

export function comparePlayerStatistics(left: PlayerStatistics, right: PlayerStatistics): number {
  if (right.wins !== left.wins) return right.wins - left.wins;
  if (right.winRate !== left.winRate) return right.winRate - left.winRate;

  return left.playerName.localeCompare(right.playerName);
}

export function compareHeadToHeadStatistics(
  left: HeadToHeadStatistics,
  right: HeadToHeadStatistics
): number {
  if (right.matches !== left.matches) return right.matches - left.matches;
  if (right.wins !== left.wins) return right.wins - left.wins;

  return left.opponentName.localeCompare(right.opponentName);
}
