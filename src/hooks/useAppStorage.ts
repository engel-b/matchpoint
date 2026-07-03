import { useEffect, useState } from "react";

import {
  ensureDefaultProfiles,
  loadAppState,
  loadProfiles,
  saveAppState,
  saveProfile,
} from "../storage/appStorage";
import { DEFAULT_KEY_BINDINGS, type KeyBindings } from "../types/controls";

import type { GameSettings, PlayerProfile } from "../types/game";

export type Theme = "dark" | "light";
export type Language = "de" | "en";

export type SelectedProfileIds = {
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
  const [language, setLanguageState] = useState<Language>("de");
  const [profiles, setProfiles] = useState<PlayerProfile[]>(defaultProfiles);
  const [storedGameSettings, setStoredGameSettings] = useState<GameSettings>(defaultGameSettings);
  const [selectedProfileIds, setSelectedProfileIdsState] =
    useState<SelectedProfileIds>(defaultSelectedProfileIds);
  const [keyBindings, setKeyBindingsState] = useState<KeyBindings>(DEFAULT_KEY_BINDINGS);

  useEffect(() => {
    async function loadStoredData() {
      const storedAppState = await loadAppState();

      if (storedAppState) {
        setThemeState(storedAppState.theme ?? "dark");
        setLanguageState(storedAppState.language ?? "de");
        setStoredGameSettings(storedAppState.gameSettings ?? defaultGameSettings);
        setSelectedProfileIdsState(storedAppState.selectedProfileIds ?? defaultSelectedProfileIds);
        setKeyBindingsState(storedAppState.keyBindings ?? DEFAULT_KEY_BINDINGS);
      }

      const storedProfiles = await loadProfiles();

      if (storedProfiles.length > 0) {
        setProfiles(storedProfiles);
      } else {
        await ensureDefaultProfiles(defaultProfiles);
      }
    }

    void loadStoredData();
  }, [defaultProfiles, defaultGameSettings, defaultSelectedProfileIds]);

  function persistAppState(nextState: {
    theme?: Theme;
    language?: Language;
    gameSettings?: GameSettings;
    selectedProfileIds?: SelectedProfileIds;
    keyBindings?: KeyBindings;
  }) {
    void saveAppState({
      id: "app-state",
      theme: nextState.theme ?? theme,
      language: nextState.language ?? language,
      gameSettings: nextState.gameSettings ?? storedGameSettings,
      selectedProfileIds: nextState.selectedProfileIds ?? selectedProfileIds,
      keyBindings: nextState.keyBindings ?? keyBindings,
    });
  }

  function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
    persistAppState({ theme: nextTheme });
  }

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    persistAppState({ language: nextLanguage });
  }

  function saveGameSettings(nextGameSettings: GameSettings) {
    setStoredGameSettings(nextGameSettings);
    persistAppState({ gameSettings: nextGameSettings });
  }

  function saveSelectedProfileIds(nextSelectedProfileIds: SelectedProfileIds) {
    setSelectedProfileIdsState(nextSelectedProfileIds);
    persistAppState({ selectedProfileIds: nextSelectedProfileIds });
  }

  function saveKeyBindings(nextKeyBindings: KeyBindings) {
    setKeyBindingsState(nextKeyBindings);
    persistAppState({ keyBindings: nextKeyBindings });
  }

  function addProfile(profile: PlayerProfile) {
    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    void saveProfile(profile);
  }

  return {
    theme,
    setTheme,
    language,
    setLanguage,
    profiles,
    addProfile,
    storedGameSettings,
    saveGameSettings,
    selectedProfileIds,
    saveSelectedProfileIds,
    keyBindings,
    saveKeyBindings,
  };
}
