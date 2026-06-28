import type { Theme } from "../hooks/useAppStorage";

type Props = {
  theme: Theme;
  setsToWin: number;
  onThemeChange: (theme: Theme) => void;
  onSetsToWinChange: (setsToWin: number) => void;
  onResetGame: () => void;
  onClose: () => void;
};

export function SettingsDialog({
  theme,
  setsToWin,
  onThemeChange,
  onSetsToWinChange,
  onResetGame,
  onClose,
}: Props) {
  function handleResetGame() {
    const confirmed = window.confirm("Aktuelles Spiel wirklich abbrechen?");

    if (!confirmed) return;

    onResetGame();
    onClose();
  }

  return (
    <div className="dialogBackdrop" onClick={onClose}>
      <div className="dialog" onClick={(event) => event.stopPropagation()}>
        <h2>Einstellungen</h2>

        <label className="settingRow">
          <span>Theme</span>

          <select
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as Theme)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>

        <label className="settingRow">
          <span>Spielmodus</span>

          <select
            value={setsToWin}
            onChange={(event) => onSetsToWinChange(Number(event.target.value))}
          >
            <option value={1}>Einzelrunde</option>
            <option value={2}>Best of 3</option>
            <option value={3}>Best of 5</option>
            <option value={4}>Best of 7</option>
          </select>
        </label>

        <button className="dangerButton" onClick={handleResetGame}>
          Spiel abbrechen
        </button>

        <button className="closeButton" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}