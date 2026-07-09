export function calculateWinRate(wins: number, matches: number): number {
  if (matches === 0) return 0;

  return wins / matches;
}

export function formatDifference(value: number): string {
  if (value > 0) return `+${value}`;

  return value.toString();
}
