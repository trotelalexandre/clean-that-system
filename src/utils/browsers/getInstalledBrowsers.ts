import { browsers } from "../../data/browsers.js";
import { existsSync } from "fs";
import { Browsers } from "../../types/browsers.js";

export function getInstalledBrowsers(
  errors: Map<string, Set<string>>
): Browsers {
  const installedBrowsers: Browsers = [];

  for (const browser of browsers) {
    try {
      const path =
        process.platform === "win32"
          ? browser.winPath
          : process.platform === "darwin"
            ? browser.macPath
            : browser.linuxPath;
      if (path && existsSync(path)) {
        installedBrowsers.push(browser);
      }
    } catch {
      const errorMessage = `Failed to check cache for ${browser.name}.`;
      if (!errors.has(browser.name)) {
        errors.set(browser.name, new Set<string>());
      }
      errors.get(browser.name)?.add(errorMessage);
    }
  }

  return installedBrowsers;
}
