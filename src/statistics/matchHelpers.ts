import type { MatchResult } from "../types/match";

export type PlayerSide = "player1" | "player2";

export function getPlayerSide(match: MatchResult, playerId: string): PlayerSide | null {
  if (match.player1Id === playerId) return "player1";
  if (match.player2Id === playerId) return "player2";

  return null;
}

export function getOpponent(
  match: MatchResult,
  playerSide: PlayerSide
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
