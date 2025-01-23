import { Cache } from "../../types/caches.js";

export function getCachePath(cache: Cache): string | undefined {
  switch (process.platform) {
    case "win32":
      return cache.winPath;
    case "darwin":
      return cache.macPath;
    case "linux":
      return cache.linuxPath;
    default:
      return "";
  }
}
