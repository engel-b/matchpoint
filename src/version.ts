export const appVersion = import.meta.env.VITE_APP_VERSION ?? "dev";

export const commitSha = import.meta.env.VITE_COMMIT_SHA
  ? String(import.meta.env.VITE_COMMIT_SHA).slice(0, 7)
  : "local";
