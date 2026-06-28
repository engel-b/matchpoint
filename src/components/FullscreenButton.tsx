import { useEffect, useState } from "react";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    handleFullscreenChange();

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  }

  return (
    <button
      className="iconButton"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Vollbild verlassen" : "Vollbild öffnen"}
      title={isFullscreen ? "Vollbild verlassen" : "Vollbild öffnen"}
    >
      {isFullscreen ? "⇱⇲" : "⛶"}
    </button>
  );
}