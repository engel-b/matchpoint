import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const excludedDirectories = new Set([
  "node_modules",
  "dist",
  "coverage",
  "docs",
  ".vite",
  ".vitepress",
]);

const sourceFileExtensions = [".ts", ".tsx"];

export type SourceFile = {
  path: string;
  content: string;
};

export function readSourceFiles(rootDirectory: string): SourceFile[] {
  return collectSourceFilePaths(rootDirectory).map((path) => ({
    path,
    content: readFileSync(path, "utf-8"),
  }));
}

function collectSourceFilePaths(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      if (excludedDirectories.has(entry)) return [];

      return collectSourceFilePaths(path);
    }

    if (!stats.isFile()) return [];
    if (isTestFile(path)) return [];
    if (!sourceFileExtensions.some((extension) => path.endsWith(extension))) return [];

    return [path];
  });
}

function isTestFile(path: string): boolean {
  return path.endsWith(".test.ts") || path.endsWith(".test.tsx");
}
