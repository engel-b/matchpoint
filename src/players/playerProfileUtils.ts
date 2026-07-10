import type { PlayerProfile } from "../types/game";

export function normalizePlayerName(name: string): string {
  return name.trim().toLocaleLowerCase();
}

export function isDuplicatePlayerName(
  profiles: PlayerProfile[],
  name: string,
  ignoredProfileId?: string
): boolean {
  const normalizedName = normalizePlayerName(name);

  return profiles.some(
    (profile) =>
      profile.id !== ignoredProfileId && normalizePlayerName(profile.name) === normalizedName
  );
}

export function createPlayerProfile(name: string): PlayerProfile {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: now,
    updatedAt: now,
  };
}
