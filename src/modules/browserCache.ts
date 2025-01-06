import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { browsers } from "../data/params.js";
import os from "os";

function backupCache(cachePath, browserName) {
  const backupDir = join(os.homedir(), `${browserName}_cache_backup`);
  if (!existsSync(backupDir)) mkdirSync(backupDir);
  const backupPath = join(backupDir, `${browserName}_cache_backup.zip`);
  execSync(`tar -czf ${backupPath} -C ${cachePath} .`, { stdio: "inherit" });
}

async function checkBrowserCache(advice, actions, { backupCache }) {
  browsers.forEach((browser) => {
    const cachePath = join(os.homedir(), ".cache", browser.toLowerCase());
    if (existsSync(cachePath)) {
      const cacheSize = execSync(`du -sh ${cachePath}`).toString();
      advice.push(`${browser} Cache Size: ${cacheSize}`);
      actions.push({
        description: `Clear ${browser} cache`,
        execute: () => {
          if (backupCache) backupCache(cachePath, browser);
          execSync(`rm -rf ${cachePath}/*`, { stdio: "inherit" });
        },
      });
    }
  });
}

export { checkBrowserCache, backupCache };
