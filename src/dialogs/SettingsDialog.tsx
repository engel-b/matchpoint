import { useTranslation } from "react-i18next";

import { appVersion, commitSha } from "../version";

import type { Language, Theme } from "../hooks/useAppStorage";
import type { ControlAction, KeyBindings } from "../types/controls";
import type { GameSettings } from "../types/game";

type Props = {
  theme: Theme;
  language: Language;
  gameSettings: GameSettings;
  keyBindings: KeyBindings;
  capturingAction: ControlAction | null;
  onThemeChange: (theme: Theme) => void;
  onLanguageChange: (language: Language) => void;
  onGameSettingsChange: (settings: GameSettings) => void;
  onStartKeyCapture: (action: ControlAction) => void;
  onClearKeyBinding: (action: ControlAction) => void;
  onResetGame: () => void;
  onClose: () => void;
};

export function SettingsDialog({
  theme,
  language,
  gameSettings,
  keyBindings,
  capturingAction,
  onThemeChange,
  onLanguageChange,
  onGameSettingsChange,
  onStartKeyCapture,
  onClearKeyBinding,
  onResetGame,
  onClose,
}: Props) {
  const { t } = useTranslation();

  function handleResetGame() {
    const confirmed = window.confirm(t("settings.confirmCancelGame"));

    if (!confirmed) return;

    onResetGame();
    onClose();
  }

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog" onClick={(event) => event.stopPropagation()}>
        <h2>{t("settings.title")}</h2>

        <div className="versionInfo">
          <strong>MatchPoint</strong>
          <span>Version: {appVersion}</span>
          <span>Build: {commitSha}</span>
        </div>

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

          <select value={theme} onChange={(event) => onThemeChange(event.target.value as Theme)}>
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

        <div className="settingsSection">
          <h3>{t("controls.title")}</h3>

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

        <button className="dangerButton" onClick={handleResetGame}>
          {t("settings.cancelGame")}
        </button>

        <button className="closeButton" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
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
