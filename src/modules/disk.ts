import { fsSize } from "systeminformation";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checkDisk(advice: string[], actions: Actions) {
  const diskUsage = await fsSize();
  if (diskUsage[0].used / diskUsage[0].size > 0.8) {
    advice.push(
      "Disk space usage is high. Consider cleaning up unnecessary files."
    );
    actions.push({
      description: "Find large files on disk",
      execute: () => {
        const command =
          process.platform === "win32"
            ? 'powershell -Command "Get-ChildItem -Path C:\\ -File -Recurse | Where-Object {$_.Length -gt 100MB}"'
            : "find / -type f -size +100M";
        execSync(command, { stdio: "inherit" });
      },
    });
  }
}

export { checkDisk };
