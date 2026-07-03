import { db } from "./db";

import type { MatchResult } from "../types/match";

export async function saveMatch(match: MatchResult): Promise<void> {
  await db.matches.put(match);
}

export async function loadMatches(): Promise<MatchResult[]> {
  return db.matches.orderBy("finishedAt").reverse().toArray();
}
