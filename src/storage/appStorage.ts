import { db, type StoredAppState } from "./db";

import type { PlayerProfile } from "../types/game";

export async function loadProfiles(): Promise<PlayerProfile[]> {
  return db.profiles.orderBy("createdAt").toArray();
}

export async function saveProfile(profile: PlayerProfile): Promise<void> {
  await db.profiles.put(profile);
}

export async function ensureDefaultProfiles(profiles: PlayerProfile[]): Promise<void> {
  for (const profile of profiles) {
    await db.profiles.put(profile);
  }
}

export async function loadAppState(): Promise<StoredAppState | undefined> {
  return db.appState.get("app-state");
}

export async function saveAppState(state: StoredAppState): Promise<void> {
  await db.appState.put(state);
}

export async function deleteAllLocalData() {
  await db.delete();
}
