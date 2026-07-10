import { join } from "node:path";

import { readSourceFiles } from "../test/sourceFiles";

import de from "./de.json";
import en from "./en.json";

type TranslationTree = Record<string, unknown>;

export type TranslationValidationResult = {
  missingInGerman: string[];
  missingInEnglish: string[];
  unusedInGerman: string[];
  unusedInEnglish: string[];
};

const translationKeyPattern = /\b(?:t|i18n\.t)\(\s*["'`]([^"'`]+)["'`]/g;

export function validateTranslations(): TranslationValidationResult {
  const germanKeys = flattenTranslationTree(de);
  const englishKeys = flattenTranslationTree(en);
  const usedKeys = collectUsedTranslationKeys();

  return {
    missingInGerman: findMissingKeys(usedKeys, germanKeys),
    missingInEnglish: findMissingKeys(usedKeys, englishKeys),
    unusedInGerman: findUnusedKeys(germanKeys, usedKeys),
    unusedInEnglish: findUnusedKeys(englishKeys, usedKeys),
  };
}

export function flattenTranslationTree(tree: TranslationTree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (isTranslationBranch(value)) {
      return flattenTranslationTree(value, nextKey);
    }

    return [nextKey];
  });
}

function collectUsedTranslationKeys(): string[] {
  const sourceRoot = join(process.cwd(), "src");
  const files = readSourceFiles(sourceRoot);
  const keys = new Set<string>();

  for (const file of files) {
    for (const match of file.content.matchAll(translationKeyPattern)) {
      keys.add(match[1]);
    }
  }

  return [...keys].sort();
}

function findMissingKeys(usedKeys: string[], existingKeys: string[]): string[] {
  const existingKeySet = new Set(existingKeys);

  return usedKeys.filter((key) => !existingKeySet.has(key));
}

function findUnusedKeys(existingKeys: string[], usedKeys: string[]): string[] {
  const usedKeySet = new Set(usedKeys);

  return existingKeys.filter((key) => !usedKeySet.has(key));
}

function isTranslationBranch(value: unknown): value is TranslationTree {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
