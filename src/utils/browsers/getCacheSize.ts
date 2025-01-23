import { existsSync, statSync } from "fs";
import { Browser } from "types/browsers";

export async function getCacheSize(
  browser: Browser,
  errors: Map<string, Set<string>>
): Promise<number> {
  try {
    const path =
      process.platform === "win32"
        ? browser.winCache
        : process.platform === "darwin"
          ? browser.macCache
          : browser.linuxCache;
    if (path && existsSync(path)) {
      const stats = statSync(path);
      const fileSizeInBytes = stats.size;
      const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
      return fileSizeInMegabytes;
    } else {
      return 0;
    }
  } catch {
    const errorMessage = `Failed to check cache for ${browser.name}.`;
    if (!errors.has(browser.name)) {
      errors.set(browser.name, new Set<string>());
    } else {
      errors.get(browser.name)?.add(errorMessage);
    }
    return 0;
  }
}
