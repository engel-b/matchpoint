import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Language, Theme } from "../hooks/useAppStorage";
import type { ControlAction, KeyBindings } from "../types/controls";
import type { PlayerProfile, GameSettings } from "../types/game";

type SettingsView = "overview" | "general" | "players" | "controls" | "danger";

type Props = {
  theme: Theme;
  language: Language;
  gameSettings: GameSettings;
  keyBindings: KeyBindings;
  profiles: PlayerProfile[];
  capturingAction: ControlAction | null;
  onCreateProfile: (name: string) => void;
  onRenameProfile: (profileId: string, name: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
  onGameSettingsChange: (settings: GameSettings) => void;
  onStartKeyCapture: (action: ControlAction) => void;
  onClearKeyBinding: (action: ControlAction) => void;
  onResetGame: () => void;
  onDeleteLocalData: () => void;
  onClose: () => void;
};

export function SettingsDialog({
  theme,
  language,
  gameSettings,
  keyBindings,
  profiles,
  capturingAction,
  onCreateProfile,
  onRenameProfile,
  onDeleteProfile,
  onThemeChange,
  onLanguageChange,
  onGameSettingsChange,
  onStartKeyCapture,
  onClearKeyBinding,
  onResetGame,
  onDeleteLocalData,
  onClose,
}: Props) {
  const { t } = useTranslation();
  const [view, setView] = useState<SettingsView>("overview");

  function handleResetGame() {
    const confirmed = window.confirm(t("settings.confirmCancelGame"));

    if (!confirmed) return;

    onResetGame();
    onClose();
  }

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog settingsDialog" onClick={(event) => event.stopPropagation()}>
        {view === "overview" && (
          <>
            <header className="dialogHeader">
              <h2>{t("settings.title")}</h2>
            </header>

            <div className="dialogContent">
              <SettingsNavigationButton
                title={t("settings.general")}
                description={t("settings.generalDescription")}
                onClick={() => setView("general")}
              />

              <SettingsNavigationButton
                title={t("settings.players")}
                description={t("settings.playersDescription")}
                onClick={() => setView("players")}
              />

              <SettingsNavigationButton
                title={t("controls.title")}
                description={t("settings.controlsDescription")}
                onClick={() => setView("controls")}
              />

              <SettingsNavigationButton
                title={t("settings.dangerZone")}
                description={t("settings.dangerZoneDescription")}
                onClick={() => setView("danger")}
                danger
              />
            </div>

            <footer className="dialogFooter">
              <button type="button" className="closeButton" onClick={onClose}>
                {t("common.close")}
              </button>
            </footer>
          </>
        )}

        {view === "general" && (
          <>
            <SettingsHeader title={t("settings.general")} onBack={() => setView("overview")} />

            <div className="dialogContent">
              <label className="settingRow">
                <span>{t("settings.language")}</span>

                <select
                  value={language}
                  onChange={(event) => onLanguageChange(event.target.value as Language)}
                >
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                </select>
              </label>

              <label className="settingRow">
                <span>{t("settings.theme")}</span>

                <select
                  value={theme}
                  onChange={(event) => onThemeChange(event.target.value as Theme)}
                >
                  <option value="dark">{t("settings.dark")}</option>
                  <option value="light">{t("settings.light")}</option>
                </select>
              </label>

              <label className="settingRow">
                <span>{t("settings.gameMode")}</span>

                <select
                  value={gameSettings.setsToWin}
                  onChange={(event) =>
                    onGameSettingsChange({
                      ...gameSettings,
                      setsToWin: Number(event.target.value),
                    })
                  }
                >
                  <option value={1}>{t("settings.singleRound")}</option>
                  <option value={2}>{t("settings.bestOf3")}</option>
                  <option value={3}>{t("settings.bestOf5")}</option>
                  <option value={4}>{t("settings.bestOf7")}</option>
                </select>
              </label>
            </div>

            <button className="secondaryButton" onClick={() => setView("overview")}>
              {t("common.back")}
            </button>
          </>
        )}

        {view === "players" && (
          <>
            <SettingsHeader title={t("settings.players")} onBack={() => setView("overview")} />

            <div className="dialogContent">
              <PlayerManagement
                profiles={profiles}
                onCreateProfile={onCreateProfile}
                onRenameProfile={onRenameProfile}
                onDeleteProfile={onDeleteProfile}
              />
            </div>

            <button className="secondaryButton" onClick={() => setView("overview")}>
              {t("common.back")}
            </button>
          </>
        )}

        {view === "controls" && (
          <>
            <SettingsHeader title={t("controls.title")} onBack={() => setView("overview")} />

            <div className="dialogContent">
              <KeyBindingRow
                label={t("controls.player1Point")}
                value={keyBindings.player1Point.join(", ")}
                isCapturing={capturingAction === "player1Point"}
                onLearn={() => onStartKeyCapture("player1Point")}
                onClear={() => onClearKeyBinding("player1Point")}
                learnLabel={t("controls.learn")}
                clearLabel={t("controls.clear")}
                capturingLabel={t("controls.pressKey")}
              />

              <KeyBindingRow
                label={t("controls.player2Point")}
                value={keyBindings.player2Point.join(", ")}
                isCapturing={capturingAction === "player2Point"}
                onLearn={() => onStartKeyCapture("player2Point")}
                onClear={() => onClearKeyBinding("player2Point")}
                learnLabel={t("controls.learn")}
                clearLabel={t("controls.clear")}
                capturingLabel={t("controls.pressKey")}
              />

              <KeyBindingRow
                label={t("common.undo")}
                value={keyBindings.undo.join(", ")}
                isCapturing={capturingAction === "undo"}
                onLearn={() => onStartKeyCapture("undo")}
                onClear={() => onClearKeyBinding("undo")}
                learnLabel={t("controls.learn")}
                clearLabel={t("controls.clear")}
                capturingLabel={t("controls.pressKey")}
              />
            </div>

            <button className="secondaryButton" onClick={() => setView("overview")}>
              {t("common.back")}
            </button>
          </>
        )}

        {view === "danger" && (
          <>
            <SettingsHeader title={t("settings.dangerZone")} onBack={() => setView("overview")} />

            <div className="dialogContent">
              <div className="dangerZone">
                <div>
                  <strong>{t("settings.cancelGame")}</strong>
                  <span>{t("settings.cancelGameDescription")}</span>
                </div>

                <button className="dangerButton" onClick={handleResetGame}>
                  {t("settings.cancelGame")}
                </button>
              </div>

              <div className="dangerZone">
                <div>
                  <strong>{t("settings.resetLocalData")}</strong>
                  <span>{t("settings.resetLocalDataDescription")}</span>
                </div>

                <button className="dangerButton" onClick={onDeleteLocalData}>
                  {t("settings.resetLocalData")}
                </button>
              </div>
            </div>

            <button className="secondaryButton" onClick={() => setView("overview")}>
              {t("common.back")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SettingsHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="settingsHeader">
      <button type="button" className="settingsBackButton" onClick={onBack}>
        ←
      </button>

      <h2>{title}</h2>

      <span aria-hidden="true" title={t("settings.title")} />
    </div>
  );
}

function SettingsNavigationButton({
  title,
  description,
  onClick,
  danger = false,
}: {
  title: string;
  description: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`settingsNavButton${danger ? " settingsNavButton--danger" : ""}`}
      onClick={onClick}
    >
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>

      <span aria-hidden="true">›</span>
    </button>
  );
}

function KeyBindingRow({
  label,
  value,
  isCapturing,
  onLearn,
  onClear,
  learnLabel,
  clearLabel,
  capturingLabel,
}: {
  label: string;
  value: string;
  isCapturing: boolean;
  onLearn: () => void;
  onClear: () => void;
  learnLabel: string;
  clearLabel: string;
  capturingLabel: string;
}) {
  return (
    <div className="keyBindingRow">
      <div>
        <strong>{label}</strong>
        <span>{isCapturing ? capturingLabel : value || "—"}</span>
      </div>

      <div className="keyBindingActions">
        <button type="button" onClick={onLearn}>
          {learnLabel}
        </button>

        <button type="button" onClick={onClear}>
          {clearLabel}
        </button>
      </div>
    </div>
  );
}

function PlayerManagement({
  profiles,
  onCreateProfile,
  onRenameProfile,
  onDeleteProfile,
}: {
  profiles: PlayerProfile[];
  onCreateProfile: (name: string) => void;
  onRenameProfile: (profileId: string, name: string) => void;
  onDeleteProfile: (profileId: string) => void;
}) {
  const { t } = useTranslation();
  const [newPlayerName, setNewPlayerName] = useState("");

  function handleCreateProfile() {
    const name = newPlayerName.trim();

    if (!name) return;

    onCreateProfile(name);
    setNewPlayerName("");
  }

  return (
    <div className="playerManagement">
      <p className="settingsHint">{t("settings.playersHint")}</p>

      <div className="managedPlayerList">
        {profiles.map((profile) => (
          <ManagedPlayerRow
            key={profile.id}
            profile={profile}
            onRenameProfile={onRenameProfile}
            onDeleteProfile={onDeleteProfile}
          />
        ))}
      </div>

      <div className="newPlayerBox">
        <label htmlFor="managed-new-player-name">{t("player.new")}</label>

        <input
          id="managed-new-player-name"
          value={newPlayerName}
          onChange={(event) => setNewPlayerName(event.target.value)}
          placeholder={t("player.namePlaceholder")}
        />

        <button className="closeButton" onClick={handleCreateProfile}>
          {t("player.add")}
        </button>
      </div>
    </div>
  );
}

function ManagedPlayerRow({
  profile,
  onRenameProfile,
  onDeleteProfile,
}: {
  profile: PlayerProfile;
  onRenameProfile: (profileId: string, name: string) => void;
  onDeleteProfile: (profileId: string) => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState(profile.name);

  function handleBlur() {
    const nextName = name.trim();

    if (!nextName || nextName === profile.name) {
      setName(profile.name);
      return;
    }

    onRenameProfile(profile.id, nextName);
  }

  return (
    <div className="managedPlayerRow">
      <input
        value={name}
        aria-label={t("player.name")}
        onChange={(event) => setName(event.target.value)}
        onBlur={handleBlur}
      />

      <button type="button" className="dangerButton" onClick={() => onDeleteProfile(profile.id)}>
        {t("player.delete")}
      </button>
    </div>
  );
}
