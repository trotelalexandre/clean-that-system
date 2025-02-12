import inquirer from "inquirer";
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
  const installedBrowsers = getInstalledBrowsers(errors);

  if (!installedBrowsers.length) {
    return;
  }

  const browsersToClear = [];

  for (const browser of installedBrowsers) {
    const cacheSize = await getCacheSize(browser, errors);
    if (cacheSize > BROWSER_CACHE_LIMIT_IN_MB) {
      advices.push(
        `The cache size of ${browser.name} is ${cacheSize.toFixed(2)} MB.`
      );
      browsersToClear.push(browser);
    }
  }

  if (browsersToClear.length > 0) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedBrowsers",
        message: "Select browsers to clear cache:",
        choices: browsersToClear.map((browser) => ({
          name: browser.name,
          value: browser,
        })),
      },
    ]);

    for (const browser of answers.selectedBrowsers) {
      actions.push({
        description: `Clear cache for ${browser.name}`,
        execute: () => {
          try {
            const command =
              process.platform === "win32"
                ? `rmdir /s /q ${browser.winCache}`
                : process.platform === "darwin"
                  ? `rm -rf ${browser.macCache}`
                  : `rm -rf ${browser.linuxCache}`;
            execSync(command, { stdio: "inherit" });
          } catch {
            const errorMessage = `Failed to clear cache for ${browser.name}.`;
            if (!errors.has(browser.name)) {
              errors.set(browser.name, new Set<string>());
            } else {
              errors.get(browser.name)?.add(errorMessage);
            }
          }
        },
      });
    }
  }
}

export { checkBrowsersCache };
