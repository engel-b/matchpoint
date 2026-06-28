import { useEffect, useState } from "react";
import type { PlayerProfile } from "../types/game";
import {
  ensureDefaultProfiles,
  loadProfiles,
  loadSettings,
  saveProfile,
  saveSettings,
} from "../storage/appStorage";

export type Theme = "dark" | "light";

type UseAppStorageArgs = {
  defaultProfiles: PlayerProfile[];
};

export function useAppStorage({ defaultProfiles }: UseAppStorageArgs) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [setsToWin, setSetsToWinState] = useState(3);
  const [profiles, setProfiles] = useState<PlayerProfile[]>(defaultProfiles);

  useEffect(() => {
    async function loadStoredData() {
      const storedSettings = await loadSettings();

      if (storedSettings) {
        setThemeState(storedSettings.theme);
        setSetsToWinState(storedSettings.setsToWin ?? 3);
      }

      const storedProfiles = await loadProfiles();

      if (storedProfiles.length > 0) {
        setProfiles(storedProfiles);
      } else {
        await ensureDefaultProfiles(defaultProfiles);
      }
    }

    void loadStoredData();
  }, [defaultProfiles]);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);

    void saveSettings({
      id: "settings",
      theme: nextTheme,
      setsToWin,
    });
  }

  function setSetsToWin(nextSetsToWin: number) {
    setSetsToWinState(nextSetsToWin);

    void saveSettings({
      id: "settings",
      theme,
      setsToWin: nextSetsToWin,
    });
  }

  function addProfile(profile: PlayerProfile) {
    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    void saveProfile(profile);
  }

  return {
    theme,
    setTheme,
    setsToWin,
    setSetsToWin,
    profiles,
    addProfile,
  };
}