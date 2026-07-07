import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInstalledPwaAtStartup } from "../utils/pwa";

import { IconButton } from "./IconButton";

export function FullscreenButton() {
  const { t } = useTranslation();

  const [showButton] = useState(() => !isInstalledPwaAtStartup());
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!showButton) {
    return null;
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  }

  return (
    <IconButton
      label={isFullscreen ? t("fullscreen.close") : t("fullscreen.open")}
      onClick={() => void toggleFullscreen()}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </IconButton>
  );
}
