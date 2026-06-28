type Theme = "dark" | "light";

type Props = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onClose: () => void;
};

export function SettingsDialog({ theme, onThemeChange, onClose }: Props) {
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

        <button className="closeButton" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}