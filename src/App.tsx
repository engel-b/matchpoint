import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppMenu } from "./components/AppMenu";
import { FullscreenButton } from "./components/FullscreenButton";
import { ScorePanel } from "./components/ScorePanel";
import { UpdatePrompt } from "./components/UpdatePrompt";
import { AboutDialog } from "./dialogs/AboutDialog";
import { MatchHistoryDialog } from "./dialogs/MatchHistoryDialog";
import { PlayerDialog } from "./dialogs/PlayerDialog";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { useAppStorage } from "./hooks/useAppStorage";
import { useGame } from "./hooks/useGame";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useKeyCapture } from "./hooks/useKeyCapture";
import { deleteAllLocalData } from "./storage/appStorage";
import { saveMatch } from "./storage/matchStorage";

import type { ControlAction, KeyBindings } from "./types/controls";
import type { GameSettings, PlayerId, PlayerProfile } from "./types/game";

export default function App() {
  const { t, i18n } = useTranslation();
  const savedMatchIdRef = useRef<string | null>(null);

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
    updateGameSettings,
    applySelectedProfiles,
    selectProfile,
    createProfile,
  } = useGame();

  const {
    theme,
    setTheme,
    language,
    setLanguage,
    profiles,
    addProfile,
    storedGameSettings,
    saveGameSettings,
    selectedProfileIds,
    saveSelectedProfileIds,
    keyBindings,
    saveKeyBindings,
  } = useAppStorage({
    defaultProfiles,
    defaultGameSettings: game.settings,
    defaultSelectedProfileIds: {
      player1: game.player1.profileId,
      player2: game.player2.profileId,
    },
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileDialogPlayer, setProfileDialogPlayer] = useState<PlayerId | null>(null);

  const { capturingAction, startCapture } = useKeyCapture((action, key) => {
    const nextKeyBindings: KeyBindings = {
      ...keyBindings,
      [action]: [key],
    };

    saveKeyBindings(nextKeyBindings);
  });

  useKeyboardControls({
    keyBindings,
    disabled: settingsOpen || historyOpen || profileDialogPlayer !== null || resultWinner !== null,
    onPlayer1Point: () => addPoint("player1"),
    onPlayer2Point: () => addPoint("player2"),
    onUndo: undo,
  });

  useEffect(() => {
    setProfiles(profiles);
  }, [profiles, setProfiles]);

  useEffect(() => {
    updateGameSettings(storedGameSettings);
  }, [storedGameSettings, updateGameSettings]);

  useEffect(() => {
    applySelectedProfiles(profiles, selectedProfileIds);
  }, [profiles, selectedProfileIds, applySelectedProfiles]);

  useEffect(() => {
    if (!game.completedMatch) return;
    if (savedMatchIdRef.current === game.completedMatch.id) return;

    savedMatchIdRef.current = game.completedMatch.id;
    void saveMatch(game.completedMatch);
  }, [game.completedMatch]);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language, i18n]);

  function handleNewGame() {
    const confirmed = window.confirm(t("settings.confirmCancelGame"));
    if (!confirmed) return;

    resetGame();
  }

  function handleSelectProfile(playerId: PlayerId, profile: PlayerProfile) {
    selectProfile(playerId, profile);

    saveSelectedProfileIds({
      player1: playerId === "player1" ? profile.id : game.player1.profileId,
      player2: playerId === "player2" ? profile.id : game.player2.profileId,
    });

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

    saveSelectedProfileIds({
      player1: playerId === "player1" ? profile.id : game.player1.profileId,
      player2: playerId === "player2" ? profile.id : game.player2.profileId,
    });

    setProfileDialogPlayer(null);
  }

  function handleGameSettingsChange(nextSettings: GameSettings) {
    updateGameSettings(nextSettings);
    saveGameSettings(nextSettings);
  }

  function clearKeyBinding(action: ControlAction) {
    saveKeyBindings({
      ...keyBindings,
      [action]: [],
    });
  }

  async function handleDeleteLocalData() {
    const confirmed = window.confirm(t("settings.confirmResetLocalData"));

    if (!confirmed) return;

    await deleteAllLocalData();

    window.location.reload();
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
        <FullscreenButton />
        <AppMenu
          onUndo={undo}
          onOpenHistory={() => setHistoryOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onNewGame={handleNewGame}
          onOpenAbout={() => setAboutOpen(true)}
        />
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
          language={language}
          gameSettings={game.settings}
          keyBindings={keyBindings}
          capturingAction={capturingAction}
          onThemeChange={setTheme}
          onLanguageChange={setLanguage}
          onGameSettingsChange={handleGameSettingsChange}
          onStartKeyCapture={startCapture}
          onClearKeyBinding={clearKeyBinding}
          onResetGame={resetGame}
          onDeleteLocalData={handleDeleteLocalData}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      <MatchHistoryDialog isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />

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

      {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} />}

      <UpdatePrompt />
    </main>
  );
}
