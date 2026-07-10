import { describe, expect, it } from "vitest";

import { validateTranslations } from "./translationValidator";

describe("translations", () => {
  it("contain all used keys and no unused keys", () => {
    const result = validateTranslations();

    expect(formatValidationResult(result)).toBe("");
  });
});

function formatValidationResult(result: {
  missingInGerman: string[];
  missingInEnglish: string[];
  unusedInGerman: string[];
  unusedInEnglish: string[];
}): string {
  return [
    formatSection("Missing German keys", result.missingInGerman),
    formatSection("Missing English keys", result.missingInEnglish),
    formatSection("Unused German keys", result.unusedInGerman),
    formatSection("Unused English keys", result.unusedInEnglish),
  ]
    .filter(Boolean)
    .join("\n\n");
}

function formatSection(title: string, keys: string[]): string {
  if (keys.length === 0) return "";

  return `${title}:\n${keys.map((key) => `- ${key}`).join("\n")}`;
}
