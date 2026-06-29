import { useEffect, useState } from "react";
import type { GameSettings, PlayerProfile } from "../types/game";
import {
  ensureDefaultProfiles,
  loadAppState,
  loadProfiles,
  saveAppState,
  saveProfile,
} from "../storage/appStorage";

export type Theme = "dark" | "light";

type SelectedProfileIds = {
  player1: string;
  player2: string;
};

type UseAppStorageArgs = {
  defaultProfiles: PlayerProfile[];
  defaultGameSettings: GameSettings;
  defaultSelectedProfileIds: SelectedProfileIds;
};

export function useAppStorage({
  defaultProfiles,
  defaultGameSettings,
  defaultSelectedProfileIds,
}: UseAppStorageArgs) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [profiles, setProfiles] = useState<PlayerProfile[]>(defaultProfiles);
  const [storedGameSettings, setStoredGameSettings] =
    useState<GameSettings>(defaultGameSettings);
  const [selectedProfileIds, setSelectedProfileIdsState] =
    useState<SelectedProfileIds>(defaultSelectedProfileIds);

  useEffect(() => {
    async function loadStoredData() {
      const storedAppState = await loadAppState();

      if (storedAppState) {
        setThemeState(storedAppState.theme);
        setStoredGameSettings(storedAppState.gameSettings);
        setSelectedProfileIdsState(
          storedAppState.selectedProfileIds ?? defaultSelectedProfileIds
        );
      }

      const storedProfiles = await loadProfiles();

      if (storedProfiles.length > 0) {
        setProfiles(storedProfiles);
      } else {
        await ensureDefaultProfiles(defaultProfiles);
      }
    }

    void loadStoredData();
  }, [defaultProfiles, defaultSelectedProfileIds]);

  function persistAppState(nextState: {
    theme?: Theme;
    gameSettings?: GameSettings;
    selectedProfileIds?: SelectedProfileIds;
  }) {
    const nextTheme = nextState.theme ?? theme;
    const nextGameSettings = nextState.gameSettings ?? storedGameSettings;
    const nextSelectedProfileIds =
      nextState.selectedProfileIds ?? selectedProfileIds;

    void saveAppState({
      id: "app-state",
      theme: nextTheme,
      gameSettings: nextGameSettings,
      selectedProfileIds: nextSelectedProfileIds,
    });
  }

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
    persistAppState({ theme: nextTheme });
  }

  function saveGameSettings(nextGameSettings: GameSettings) {
    setStoredGameSettings(nextGameSettings);
    persistAppState({ gameSettings: nextGameSettings });
  }

  function saveSelectedProfileIds(nextSelectedProfileIds: SelectedProfileIds) {
    setSelectedProfileIdsState(nextSelectedProfileIds);
    persistAppState({ selectedProfileIds: nextSelectedProfileIds });
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
    storedGameSettings,
    saveGameSettings,
    selectedProfileIds,
    saveSelectedProfileIds,
  };
}