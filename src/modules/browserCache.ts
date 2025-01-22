import { existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { browsers } from "../data/params.js";
import os from "os";
import { Actions } from "../types/core.js";

// TODO: review this function
async function checkBrowserCache(advices: string[], actions: Actions) {
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

export { checkBrowserCache };
