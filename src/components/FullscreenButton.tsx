import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconButton } from "./IconButton";

export function FullscreenButton() {
  const { t } = useTranslation();
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
    <IconButton
      label={isFullscreen ? t("fullscreen.close") : t("fullscreen.open")}
      onClick={() => toggleFullscreen()}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </IconButton>
  );
}
