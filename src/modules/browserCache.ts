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
  const command =
    process.platform === "win32"
      ? `powershell -Command "Compress-Archive -Path ${cachePath} -DestinationPath ${backupPath}"`
      : `tar -czf ${backupPath} -C ${cachePath} .`;
  execSync(command, { stdio: "inherit" });
}

interface BackupCache {
  backupCacheFlag: boolean;
}

async function checkBrowserCache(
  advices: string[],
  actions: Actions,
  { backupCacheFlag }: BackupCache
) {
  browsers.forEach((browser) => {
    const cachePath = join(os.homedir(), ".cache", browser.toLowerCase());
    if (existsSync(cachePath)) {
      const command =
        process.platform === "win32"
          ? `powershell -Command "Get-ChildItem -Recurse ${cachePath} | Measure-Object -Property Length -Sum | ForEach-Object { $_.Sum }"`
          : `du -sh ${cachePath}`;
      const cacheSize = execSync(command).toString();
      advices.push(`${browser} Cache Size: ${cacheSize}`);
      actions.push({
        description: `Clear ${browser} cache`,
        execute: () => {
          if (backupCacheFlag) backupCache(cachePath, browser);
          const command =
            process.platform === "win32"
              ? `powershell -Command "Remove-Item -Recurse -Force ${cachePath}\\*"`
              : `rm -rf ${cachePath}/*`;
          execSync(command, { stdio: "inherit" });
        },
      });
    }
  });
}

export { checkBrowserCache, backupCache };
