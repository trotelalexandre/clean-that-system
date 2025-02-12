import { Actions } from "../types/core.js";
import { caches } from "../data/caches.js";
import { getCachePath } from "../utils/caches/getCachePath.js";
import { getDirectorySize } from "../utils/getDirectorySize.js";
import { CACHE_SIZE_LIMIT_IN_MB } from "../data/params.js";
import fs from "fs";
import { execSync } from "child_process";
import inquirer from "inquirer";

export async function checkCaches(
  advices: string[],
  actions: Actions,
  errors: Map<string, Set<string>>
) {
  const cachesToClear = [];

  for (const cache of caches) {
    const cachePath = getCachePath(cache);

    if (!cachePath) continue;

    const cacheSizeBytes = getDirectorySize(cachePath, errors);
    const cacheSizeMB = cacheSizeBytes / (1024 * 1024);

    if (cacheSizeMB > CACHE_SIZE_LIMIT_IN_MB) {
      advices.push(`${cache.name} is ${cacheSizeMB.toFixed(2)} MB`);
      cachesToClear.push({ name: cache.name, path: cachePath });
    }
  }

  if (cachesToClear.length > 0) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedCaches",
        message: "Select caches to clear:",
        choices: cachesToClear.map((cache) => ({
          name: cache.name,
          value: cache.path,
        })),
      },
    ]);

    for (const cachePath of answers.selectedCaches) {
      const cache = cachesToClear.find((cache) => cache.path === cachePath);

      if (!cache) continue;

      actions.push({
        description: `Clear ${cache.name}`,
        execute: () => {
          try {
            const command =
              process.platform === "win32"
                ? `rmdir /s /q "${cachePath}"`
                : `rm -rf "${cachePath}"`;

            execSync(command, { stdio: "inherit" });

            fs.rmSync(cachePath, { recursive: true, force: true });
            fs.mkdirSync(cachePath, { recursive: true });
          } catch {
            const errorMessage = `Failed to clear cache for ${cache.name}.`;
            if (!errors.has(cache.name)) {
              errors.set(cache.name, new Set<string>());
            } else {
              errors.get(cache.name)?.add(errorMessage);
            }
          }
        },
      });
    }
  }
}
