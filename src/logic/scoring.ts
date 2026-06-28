import type { GameState, PlayerId } from "../types/game";

export const DEFAULT_SETS_TO_WIN = 3;

export function createInitialGameState(): GameState {
  const now = new Date().toISOString();

  return {
    player1: {
      profileId: "default-player-1",
      name: "#1",
      score: 0,
      sets: 0,
    },
    player2: {
      profileId: "default-player-2",
      name: "#2",
      score: 0,
      sets: 0,
    },
    profiles: [
      {
        id: "default-player-1",
        name: "#1",
        createdAt: now,
      },
      {
        id: "default-player-2",
        name: "#2",
        createdAt: now,
      },
    ],
    firstServer: Math.random() < 0.5 ? "player1" : "player2",
    displaySwapped: false,
    roundWinner: null,
    matchWinner: null,
    history: [],
    settings: {
      setsToWin: DEFAULT_SETS_TO_WIN,
    },
  };
}

export function getServer(
  player1Score: number,
  player2Score: number,
  firstServer: PlayerId
): PlayerId {
  const totalPoints = player1Score + player2Score;

  if (player1Score >= 10 && player2Score >= 10) {
    return totalPoints % 2 === 0 ? firstServer : oppositePlayer(firstServer);
  }

  const serverChanges = Math.floor(totalPoints / 2);

  return serverChanges % 2 === 0 ? firstServer : oppositePlayer(firstServer);
}

export function isSetFinished(
  player1Score: number,
  player2Score: number
): boolean {
  return (
    Math.max(player1Score, player2Score) >= 11 &&
    Math.abs(player1Score - player2Score) >= 2
  );
}

export function getSetWinner(
  player1Score: number,
  player2Score: number
): PlayerId | null {
  if (!isSetFinished(player1Score, player2Score)) {
    return null;
  }

  return player1Score > player2Score ? "player1" : "player2";
}

export function oppositePlayer(player: PlayerId): PlayerId {
  return player === "player1" ? "player2" : "player1";
}