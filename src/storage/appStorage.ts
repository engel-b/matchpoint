import { db, type AppSettings } from "./db";
import type { PlayerProfile } from "../types/game";

export async function loadProfiles(): Promise<PlayerProfile[]> {
  return db.profiles.orderBy("createdAt").toArray();
}

export async function saveProfile(profile: PlayerProfile): Promise<void> {
  await db.profiles.put(profile);
}

export async function ensureDefaultProfiles(
  profiles: PlayerProfile[]
): Promise<void> {
  for (const profile of profiles) {
    await db.profiles.put(profile);
  }
}

export async function loadSettings(): Promise<AppSettings | undefined> {
  return db.settings.get("settings");
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await db.settings.put(settings);
}