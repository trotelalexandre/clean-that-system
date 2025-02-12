import { fsSize } from "systeminformation";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";
import { DISK_USAGE_LIMIT } from "../data/params.js";

async function checkDisk(advice: string[], actions: Actions) {
  const diskUsage = await fsSize();
  if (diskUsage[0].used / diskUsage[0].size > DISK_USAGE_LIMIT) {
    advice.push(
      "Disk space usage is high. Consider cleaning up unnecessary files."
    );
    actions.push({
      description: "Find large files on disk",
      execute: () => {
        try {
          const command =
            process.platform === "win32"
              ? 'powershell -Command "Get-ChildItem -Path C:\\ -File -Recurse | Where-Object {$_.Length -gt 100MB}"'
              : "find / -type f -size +100M";
          execSync(command, { stdio: "inherit" });
        } catch {
          console.error("Failed to find large files on disk.");
        }
      },
    });
  }
}

export { checkDisk };
