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
  const [profiles, setProfiles] = useState<PlayerProfile[]>(defaultProfiles);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(() => {
    async function loadStoredData() {
      const storedSettings = await loadSettings();

      if (storedSettings) {
        setThemeState(storedSettings.theme);
      }

      const storedProfiles = await loadProfiles();

      if (storedProfiles.length > 0) {
        setProfiles(storedProfiles);
      } else {
        await ensureDefaultProfiles(defaultProfiles);
      }

      setIsStorageLoaded(true);
    }

    void loadStoredData();
  }, [defaultProfiles]);

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);

    void saveSettings({
      id: "settings",
      theme: nextTheme,
    });
  }

  function addProfile(profile: PlayerProfile) {
    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    void saveProfile(profile);
  }

  return {
    theme,
    setTheme,
    profiles,
    addProfile,
    isStorageLoaded,
  };
}