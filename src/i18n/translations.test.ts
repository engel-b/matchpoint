import { describe, expect, it } from "vitest";

import de from "./de.json";
import en from "./en.json";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type JsonObject = Record<string, JsonValue>;

function flattenKeys(object: JsonObject, prefix = ""): string[] {
  return Object.entries(object).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenKeys(value as JsonObject, fullKey);
    }

    return [fullKey];
  });
}

describe("translations", () => {
  it("has the same translation keys in German and English", () => {
    const deKeys = flattenKeys(de).sort();
    const enKeys = flattenKeys(en).sort();

    expect(enKeys).toEqual(deKeys);
  });
});
