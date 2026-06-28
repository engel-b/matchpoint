type Theme = "dark" | "light";

type Props = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onResetGame: () => void;
  onClose: () => void;
};

export function SettingsDialog({
  theme,
  onThemeChange,
  onResetGame,
  onClose,
}: Props) {
  function handleResetGame() {
    const confirmed = window.confirm("Aktuelles Spiel wirklich abbrechen?");

    if (!confirmed) {
      return;
    }

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