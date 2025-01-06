import { fsSize } from "systeminformation";
import { execSync } from "child_process";

async function checkDisk(advice, actions) {
  const diskUsage = await fsSize();
  if (diskUsage[0].used / diskUsage[0].size > 0.8) {
    advice.push(
      "Disk space usage is high. Consider cleaning up unnecessary files."
    );
    actions.push({
      description: "Find large files on disk",
      execute: () =>
        execSync("find / -type f -size +100M", { stdio: "inherit" }),
    });
  }
}

export { checkDisk };
