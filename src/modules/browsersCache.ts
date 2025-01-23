import { BROWSER_CACHE_LIMIT_IN_MB } from "../data/params.js";
import { Actions } from "../types/core.js";
import { getCacheSize } from "../utils/browsers/getCacheSize.js";
import { getInstalledBrowsers } from "../utils/browsers/getInstalledBrowsers.js";
import { execSync } from "child_process";

async function checkBrowsersCache(
  advices: string[],
  actions: Actions,
  errors: Map<string, Set<string>>
) {
  // check what browsers are installed on the system
  const installedBrowsers = getInstalledBrowsers(errors);

  // if no browsers are installed, return
  if (!installedBrowsers.length) {
    return;
  }

  // for each installed browsers, check its cache size
  for (const browser of installedBrowsers) {
    const cacheSize = await getCacheSize(browser, errors);
    if (cacheSize > BROWSER_CACHE_LIMIT_IN_MB) {
      advices.push(
        `The cache size of ${browser.name} is ${cacheSize.toFixed(2)} MB.`
      );
      actions.push({
        description: `Clear cache for ${browser.name}`,
        execute: () => {
          const command =
            process.platform === "win32"
              ? `rmdir /s /q ${browser.winCache}`
              : process.platform === "darwin"
                ? `rm -rf ${browser.macCache}`
                : `rm -rf ${browser.linuxCache}`;
          execSync(command, { stdio: "inherit" });
        },
      });
    }
  }
}

export { checkBrowsersCache };
