import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { browsers } from "../data/params.js";
import os from "os";
import { Browser } from "../types/browser.js";
import { Actions } from "../types/core.js";

function backupCache(cachePath: string, browserName: Browser) {
  const backupDir = join(os.homedir(), `${browserName}_cache_backup`);
  if (!existsSync(backupDir)) mkdirSync(backupDir);
  const backupPath = join(backupDir, `${browserName}_cache_backup.zip`);
  execSync(`tar -czf ${backupPath} -C ${cachePath} .`, { stdio: "inherit" });
}

interface BackupCache {
  backupCacheFlag: boolean;
}

async function checkBrowserCache(
  advices: string[],
  actions: Actions,
  { backupCacheFlag }: BackupCache,
) {
  browsers.forEach((browser) => {
    const cachePath = join(os.homedir(), ".cache", browser.toLowerCase());
    if (existsSync(cachePath)) {
      const cacheSize = execSync(`du -sh ${cachePath}`).toString();
      advices.push(`${browser} Cache Size: ${cacheSize}`);
      actions.push({
        description: `Clear ${browser} cache`,
        execute: () => {
          if (backupCacheFlag) backupCache(cachePath, browser);
          execSync(`rm -rf ${cachePath}/*`, { stdio: "inherit" });
        },
      });
    }
  });
}

export { checkBrowserCache, backupCache };
