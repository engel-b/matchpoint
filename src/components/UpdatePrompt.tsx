import { useEffect, useState } from "react";

export function UpdatePrompt() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    function handleUpdateAvailable() {
      setUpdateAvailable(true);
    }

    window.addEventListener("matchpoint:update-available", handleUpdateAvailable);

    return () => {
      window.removeEventListener("matchpoint:update-available", handleUpdateAvailable);
    };
  }, []);

  if (!updateAvailable) {
    return null;
  }

  function handleUpdate() {
    window.dispatchEvent(new Event("matchpoint:update-confirmed"));
  }

  return (
    <div className="updatePrompt">
      <div>
        <strong>Neue Version verfügbar</strong>
        <span>Aktualisieren, um die neueste Version zu verwenden.</span>
      </div>

      <button onClick={handleUpdate}>Aktualisieren</button>
    </div>
  );
}
