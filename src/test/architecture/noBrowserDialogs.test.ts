import { describe, expect, it } from "vitest";

import { readSourceFiles } from "./sourceFiles";

const forbiddenBrowserDialogs = ["window.alert", "window.confirm"];

describe("architecture", () => {
  it("does not use native browser alert or confirm dialogs", () => {
    const violations = readSourceFiles("src").flatMap((file) =>
      forbiddenBrowserDialogs
        .filter((forbiddenDialog) => file.content.includes(forbiddenDialog))
        .map((forbiddenDialog) => `${file.path}: uses ${forbiddenDialog}`)
    );

    expect(formatViolations(violations)).toBe("");
  });
});

function formatViolations(violations: string[]): string {
  if (violations.length === 0) return "";

  return [
    "Native browser dialogs are not allowed.",
    "",
    "Use ConfirmDialog via useDialog instead.",
    "",
    ...violations.map((violation) => `- ${violation}`),
  ].join("\n");
}
