import { useMemo, useState } from "react";
import {
  createInitialGameState,
  getServer,
  getSetWinner,
  oppositePlayer,
} from "../logic/scoring";
import type { GameState, PlayerId, PlayerProfile } from "../types/game";

export function useGame() {
  const [game, setGame] = useState<GameState>(() => createInitialGameState());

  const server = getServer(
    game.player1.score,
    game.player2.score,
    game.firstServer
  );

  const visualLeftPlayerId: PlayerId = game.displaySwapped
    ? "player2"
    : "player1";

  const visualRightPlayerId: PlayerId = game.displaySwapped
    ? "player1"
    : "player2";

  const visualLeftPlayer =
    visualLeftPlayerId === "player1" ? game.player1 : game.player2;

  const visualRightPlayer =
    visualRightPlayerId === "player1" ? game.player1 : game.player2;

  const resultWinner = game.matchWinner ?? game.roundWinner;

  const resultWinnerName =
    resultWinner === "player1"
      ? game.player1.name
      : resultWinner === "player2"
        ? game.player2.name
        : "";

  const resultText = game.matchWinner
    ? `${resultWinnerName} hat das Spiel gewonnen.`
    : `${resultWinnerName} hat die Runde gewonnen.`;

  const resultHint = game.matchWinner
    ? "Tippen für neues Spiel"
    : "Seiten wechseln · Tippen zum Fortfahren";

  const defaultProfiles = useMemo(() => game.profiles, []);

  function setProfiles(profiles: PlayerProfile[]) {
    setGame((currentGame) => ({
      ...currentGame,
      profiles,
    }));
  }

  function addPoint(playerId: PlayerId) {
    if (game.roundWinner || game.matchWinner) return;

    setGame((currentGame) => {
      const nextGame: GameState = {
        ...currentGame,
        history: [...currentGame.history, playerId],
        player1: {
          ...currentGame.player1,
          score:
            playerId === "player1"
              ? currentGame.player1.score + 1
              : currentGame.player1.score,
        },
        player2: {
          ...currentGame.player2,
          score:
            playerId === "player2"
              ? currentGame.player2.score + 1
              : currentGame.player2.score,
        },
      };

      const roundWinner = getSetWinner(
        nextGame.player1.score,
        nextGame.player2.score
      );

      if (!roundWinner) return nextGame;

      const nextPlayer1Sets =
        roundWinner === "player1"
          ? nextGame.player1.sets + 1
          : nextGame.player1.sets;

      const nextPlayer2Sets =
        roundWinner === "player2"
          ? nextGame.player2.sets + 1
          : nextGame.player2.sets;

      const matchWinner =
        nextPlayer1Sets >= nextGame.settings.setsToWin
          ? "player1"
          : nextPlayer2Sets >= nextGame.settings.setsToWin
            ? "player2"
            : null;

      return {
        ...nextGame,
        player1: {
          ...nextGame.player1,
          sets: nextPlayer1Sets,
        },
        player2: {
          ...nextGame.player2,
          sets: nextPlayer2Sets,
        },
        roundWinner,
        matchWinner,
      };
    });
  }

  function continueAfterResult() {
    if (!game.roundWinner && !game.matchWinner) return;

    setGame((currentGame) => {
      if (currentGame.matchWinner) {
        return createInitialGameState();
      }

      return {
        ...currentGame,
        player1: {
          ...currentGame.player1,
          score: 0,
        },
        player2: {
          ...currentGame.player2,
          score: 0,
        },
        firstServer: oppositePlayer(currentGame.firstServer),
        displaySwapped: !currentGame.displaySwapped,
        roundWinner: null,
        history: [],
      };
    });
  }

  function undo() {
    if (game.roundWinner || game.matchWinner) return;

    setGame((currentGame) => {
      const last = currentGame.history.at(-1);
      if (!last) return currentGame;

      return {
        ...currentGame,
        history: currentGame.history.slice(0, -1),
        player1: {
          ...currentGame.player1,
          score:
            last === "player1"
              ? Math.max(0, currentGame.player1.score - 1)
              : currentGame.player1.score,
        },
        player2: {
          ...currentGame.player2,
          score:
            last === "player2"
              ? Math.max(0, currentGame.player2.score - 1)
              : currentGame.player2.score,
        },
      };
    });
  }

  function selectProfile(playerId: PlayerId, profile: PlayerProfile) {
    setGame((currentGame) => ({
      ...currentGame,
      [playerId]: {
        ...currentGame[playerId],
        profileId: profile.id,
        name: profile.name,
      },
    }));
  }

  function createProfile(playerId: PlayerId, profile: PlayerProfile) {
    setGame((currentGame) => ({
      ...currentGame,
      profiles: [...currentGame.profiles, profile],
      [playerId]: {
        ...currentGame[playerId],
        profileId: profile.id,
        name: profile.name,
      },
    }));
  }

  function resetGame() {
  setGame((currentGame) => {
    const freshGame = createInitialGameState();

    return {
      ...freshGame,
      profiles: currentGame.profiles,
      player1: {
        ...freshGame.player1,
        profileId: currentGame.player1.profileId,
        name: currentGame.player1.name,
      },
      player2: {
        ...freshGame.player2,
        profileId: currentGame.player2.profileId,
        name: currentGame.player2.name,
      },
      settings: currentGame.settings,
    };
  });

}

  function updateSetsToWin(setsToWin: number) {
  setGame((currentGame) => ({
    ...currentGame,
    settings: {
      ...currentGame.settings,
      setsToWin,
    },
  }));
}

return {
    updateSetsToWin,
    game,
    server,
    defaultProfiles,
    setProfiles,

    visualLeftPlayerId,
    visualRightPlayerId,
    visualLeftPlayer,
    visualRightPlayer,

    resultWinner,
    resultText,
    resultHint,

    addPoint,
    continueAfterResult,
    undo,
    resetGame,
    selectProfile,
    createProfile,
  };
}