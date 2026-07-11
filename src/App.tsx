import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppMenu } from "./components/AppMenu";
import { FullscreenButton } from "./components/FullscreenButton";
import { ScorePanel } from "./components/ScorePanel";
import { UpdatePrompt } from "./components/UpdatePrompt";
import { AboutDialog } from "./dialogs/AboutDialog";
import { ConfirmDialog } from "./dialogs/ConfirmDialog";
import { MatchHistoryDialog } from "./dialogs/MatchHistoryDialog";
import { PlayerDialog } from "./dialogs/PlayerDialog";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { useAppStorage } from "./hooks/useAppStorage";
import { useDialog } from "./hooks/useDialog";
import { useGame } from "./hooks/useGame";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useKeyCapture } from "./hooks/useKeyCapture";
import { createPlayerProfile, isDuplicatePlayerName } from "./players/playerProfileUtils";
import { deleteAllLocalData } from "./storage/appStorage";
import { loadMatches, saveMatch } from "./storage/matchStorage";

import type { SettingsView } from "./dialogs/SettingsDialog";
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
    updateProfile,
    removeProfile,
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

  const { dialog, showMessage, showConfirmation, closeDialog, confirmDialog } = useDialog();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [profileDialogPlayer, setProfileDialogPlayer] = useState<PlayerId | null>(null);

  const [settingsInitialView, setSettingsInitialView] = useState<SettingsView>("overview");

  const [returnToPlayerManagement, setReturnToPlayerManagement] = useState(false);

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
    showConfirmation({
      title: t("settings.cancelGame"),
      message: t("settings.confirmCancelGame"),
      confirmLabel: t("settings.cancelGame"),
      cancelLabel: t("common.cancel"),
      danger: true,
      onConfirm: resetGame,
    });
  }

  function handleSelectProfile(playerId: PlayerId, profile: PlayerProfile) {
    const otherProfileId = playerId === "player1" ? game.player2.profileId : game.player1.profileId;

    if (profile.id === otherProfileId || profile.disabledAt) {
      return;
    }

    selectProfile(playerId, profile);

    saveSelectedProfileIds({
      player1: playerId === "player1" ? profile.id : game.player1.profileId,
      player2: playerId === "player2" ? profile.id : game.player2.profileId,
    });

    setProfileDialogPlayer(null);
  }

  function handleCreateProfile(playerId: PlayerId, name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const existingProfile = profiles.find(
      (profile) => profile.name.trim().toLocaleLowerCase() === trimmedName.toLocaleLowerCase()
    );

    if (existingProfile) {
      handleSelectProfile(playerId, existingProfile);
      return;
    }

    const profile = createPlayerProfile(trimmedName);

    addProfile(profile);
    createProfile(playerId, profile);

    saveSelectedProfileIds({
      player1: playerId === "player1" ? profile.id : game.player1.profileId,
      player2: playerId === "player2" ? profile.id : game.player2.profileId,
    });

    setProfileDialogPlayer(null);
  }

  function handleCreateManagedProfile(name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    if (isDuplicatePlayerName(profiles, trimmedName)) {
      showMessage({
        title: t("common.notice"),
        message: t("player.duplicateName"),
        confirmLabel: t("common.ok"),
      });
      return;
    }

    addProfile(createPlayerProfile(trimmedName));
  }

  function handleRenameProfile(profileId: string, name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const profile = profiles.find((currentProfile) => currentProfile.id === profileId);

    if (!profile) return;

    if (isDuplicatePlayerName(profiles, trimmedName, profileId)) {
      showMessage({
        title: t("common.notice"),
        message: t("player.duplicateName"),
        confirmLabel: t("common.ok"),
      });
      return;
    }

    updateProfile({
      ...profile,
      name: trimmedName,
      updatedAt: new Date().toISOString(),
    });
  }

  function replaceSelectedProfile(profileId: string, nextProfiles: PlayerProfile[]) {
    const activeProfiles = nextProfiles.filter((profile) => !profile.disabledAt);

    const currentPlayer1Id = selectedProfileIds.player1;
    const currentPlayer2Id = selectedProfileIds.player2;

    let nextPlayer1Id = currentPlayer1Id;
    let nextPlayer2Id = currentPlayer2Id;

    if (currentPlayer1Id === profileId) {
      const replacement = activeProfiles.find((profile) => profile.id !== nextPlayer2Id);

      if (replacement) {
        nextPlayer1Id = replacement.id;
      }
    }

    if (currentPlayer2Id === profileId) {
      const replacement = activeProfiles.find((profile) => profile.id !== nextPlayer1Id);

      if (replacement) {
        nextPlayer2Id = replacement.id;
      }
    }

    saveSelectedProfileIds({
      player1: nextPlayer1Id,
      player2: nextPlayer2Id,
    });
  }

  function handleDeleteProfile(profileId: string) {
    const activeProfiles = profiles.filter((profile) => !profile.disabledAt);

    if (activeProfiles.length <= 2) {
      showMessage({
        title: t("common.notice"),
        message: t("player.minimumProfiles"),
        confirmLabel: t("common.ok"),
      });
      return;
    }

    showConfirmation({
      title: t("player.delete"),
      message: t("player.confirmDelete"),
      confirmLabel: t("player.delete"),
      cancelLabel: t("common.cancel"),
      danger: true,
      onConfirm: async () => {
        const profile = profiles.find((currentProfile) => currentProfile.id === profileId);

        if (!profile) return;

        const matches = await loadMatches();
        const hasHistory = matches.some(
          (match) => match.player1Id === profileId || match.player2Id === profileId
        );

        if (hasHistory) {
          const now = new Date().toISOString();

          const disabledProfile: PlayerProfile = {
            ...profile,
            disabledAt: now,
            updatedAt: now,
          };

          const nextProfiles = profiles.map((currentProfile) =>
            currentProfile.id === profileId ? disabledProfile : currentProfile
          );

          updateProfile(disabledProfile);
          replaceSelectedProfile(profileId, nextProfiles);

          showMessage({
            title: t("common.notice"),
            message: t("player.disabledBecauseOfHistory"),
            confirmLabel: t("common.ok"),
          });

          return;
        }

        const nextProfiles = profiles.filter((currentProfile) => currentProfile.id !== profileId);

        removeProfile(profileId);
        replaceSelectedProfile(profileId, nextProfiles);
      },
    });
  }

  function handleDisableProfile(profileId: string) {
    const profile = profiles.find((currentProfile) => currentProfile.id === profileId);

    if (!profile) return;

    updateProfile({
      ...profile,
      disabledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  function handleEnableProfile(profileId: string) {
    const profile = profiles.find((currentProfile) => currentProfile.id === profileId);

    if (!profile) return;

    updateProfile({
      ...profile,
      disabledAt: undefined,
      updatedAt: new Date().toISOString(),
    });
  }

  function handleOpenProfileHistory(_profileId: string) {
    _profileId.trim(); // to avoid lint-error
    setSettingsOpen(false);
    setReturnToPlayerManagement(true);
    setHistoryOpen(true);
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
    showConfirmation({
      title: t("settings.resetLocalData"),
      message: t("settings.confirmResetLocalData"),
      confirmLabel: t("settings.resetLocalData"),
      cancelLabel: t("common.cancel"),
      danger: true,
      onConfirm: async () => {
        await deleteAllLocalData();
        window.location.reload();
      },
    });
  }

  const profileDialogPlayerState =
    profileDialogPlayer === "player1"
      ? game.player1
      : profileDialogPlayer === "player2"
        ? game.player2
        : null;

  const selectableProfiles = profiles.filter((profile) => {
    if (profile.disabledAt) return false;

    if (profileDialogPlayer === "player1") {
      return profile.id !== game.player2.profileId;
    }

    if (profileDialogPlayer === "player2") {
      return profile.id !== game.player1.profileId;
    }

    return false;
  });

  return (
    <main className={`app app--${theme}`}>
      <div className="topbar">
        <FullscreenButton />
        <AppMenu
          onUndo={undo}
          onOpenHistory={() => {
            setReturnToPlayerManagement(false);
            setHistoryOpen(true);
          }}
          onOpenSettings={() => {
            setSettingsInitialView("overview");
            setSettingsOpen(true);
          }}
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
          initialView={settingsInitialView}
          theme={theme}
          language={language}
          gameSettings={game.settings}
          keyBindings={keyBindings}
          profiles={profiles}
          capturingAction={capturingAction}
          onCreateProfile={handleCreateManagedProfile}
          onRenameProfile={handleRenameProfile}
          onDeleteProfile={handleDeleteProfile}
          onDisableProfile={handleDisableProfile}
          onEnableProfile={handleEnableProfile}
          onOpenProfileHistory={handleOpenProfileHistory}
          onThemeChange={setTheme}
          onLanguageChange={setLanguage}
          onGameSettingsChange={handleGameSettingsChange}
          onStartKeyCapture={startCapture}
          onClearKeyBinding={clearKeyBinding}
          onResetGame={resetGame}
          onDeleteLocalData={handleDeleteLocalData}
          onClose={() => {
            setSettingsOpen(false);
            setSettingsInitialView("overview");
          }}
        />
      )}

      <MatchHistoryDialog
        isOpen={historyOpen}
        onClose={() => {
          setHistoryOpen(false);

          if (returnToPlayerManagement) {
            setSettingsInitialView("players");
            setSettingsOpen(true);
          }

          setReturnToPlayerManagement(false);
        }}
      />

      {profileDialogPlayer && profileDialogPlayerState && (
        <PlayerDialog
          playerId={profileDialogPlayer}
          profiles={selectableProfiles}
          currentProfileId={profileDialogPlayerState.profileId}
          onSelectProfile={handleSelectProfile}
          onCreateProfile={handleCreateProfile}
          onClose={() => setProfileDialogPlayer(null)}
        />
      )}

      {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} />}

      {dialog && <ConfirmDialog {...dialog} onConfirm={confirmDialog} onCancel={closeDialog} />}

      <UpdatePrompt />
    </main>
  );
}
