import { useEffect, useState } from "react";
import { FullscreenButton } from "./components/FullscreenButton";
import { ScorePanel } from "./components/ScorePanel";
import { PlayerDialog } from "./dialogs/PlayerDialog";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { useAppStorage } from "./hooks/useAppStorage";
import { useGame } from "./hooks/useGame";
import type { PlayerId, PlayerProfile } from "./types/game";

export default function App() {
  const gameController = useGame();

  const {
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
    updateSetsToWin,
    selectProfile,
    createProfile,
  } = gameController;

  const { theme, setTheme, setsToWin, setSetsToWin, profiles, addProfile } = useAppStorage({
    defaultProfiles,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileDialogPlayer, setProfileDialogPlayer] =
    useState<PlayerId | null>(null);

  useEffect(() => {
    setProfiles(profiles);
  }, [profiles, setProfiles]);

  useEffect(() => {
  updateSetsToWin(setsToWin);
}, [setsToWin, updateSetsToWin]);

  function handleSelectProfile(playerId: PlayerId, profile: PlayerProfile) {
    selectProfile(playerId, profile);
    setProfileDialogPlayer(null);
  }

  function handleCreateProfile(playerId: PlayerId, name: string) {
    const profile: PlayerProfile = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };

    addProfile(profile);
    createProfile(playerId, profile);
    setProfileDialogPlayer(null);
  }

  const profileDialogPlayerState =
    profileDialogPlayer === "player1"
      ? game.player1
      : profileDialogPlayer === "player2"
        ? game.player2
        : null;

  return (
    <main className={`app app--${theme}`}>
      <div className="topbar">
        <button className="iconButton" onClick={undo} aria-label="Rückgängig">
          ↶
        </button>

        <FullscreenButton />

        <button
          className="iconButton"
          onClick={() => setSettingsOpen(true)}
          aria-label="Einstellungen"
        >
          ⚙
        </button>
      </div>

      <section className="scoreLayout">
        <ScorePanel
          player={visualLeftPlayer}
          setsToWin={game.settings.setsToWin}
          hasService={server === visualLeftPlayerId}
          color={visualLeftPlayerId === "player1" ? "red" : "blue"}
          onPoint={() => addPoint(visualLeftPlayerId)}
          onPlayerNameClick={() => setProfileDialogPlayer(visualLeftPlayerId)}
        />

        <ScorePanel
          player={visualRightPlayer}
          setsToWin={game.settings.setsToWin}
          hasService={server === visualRightPlayerId}
          color={visualRightPlayerId === "player1" ? "red" : "blue"}
          onPoint={() => addPoint(visualRightPlayerId)}
          onPlayerNameClick={() => setProfileDialogPlayer(visualRightPlayerId)}
        />
      </section>

      {resultWinner && (
        <button className="roundWinnerOverlay" onClick={continueAfterResult}>
          <div>{resultText}</div>
          <small>{resultHint}</small>
        </button>
      )}

      {settingsOpen && (
  <SettingsDialog
  theme={theme}
  setsToWin={setsToWin}
  onThemeChange={setTheme}
  onSetsToWinChange={setSetsToWin}
  onResetGame={resetGame}
  onClose={() => setSettingsOpen(false)}
/>
      )}

      {profileDialogPlayer && profileDialogPlayerState && (
        <PlayerDialog
          playerId={profileDialogPlayer}
          profiles={profiles}
          currentProfileId={profileDialogPlayerState.profileId}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
          onClose={() => setProfileDialogPlayer(null)}
        />
      )}
    </main>
  );
}