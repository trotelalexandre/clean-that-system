import { cpuUsage as _cpuUsage } from "os-utils";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checkCPU(advices: string[], actions: Actions) {
  _cpuUsage((cpuUsage) => {
    if (cpuUsage > 0.8) {
      advices.push(
        "High CPU usage detected. Consider closing heavy applications."
      );
      actions.push({
        description: "List top CPU-consuming processes",
        execute: () => {
          const command =
            process.platform === "win32"
              ? 'powershell -Command "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10"'
              : process.platform === "darwin"
                ? "ps -A -o pid,ppid,comm,%cpu | sort -k 4 -r | head"
                : "ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head";
          execSync(command, { stdio: "inherit" });
        },
      });
    }
  });
}

export { checkCPU };
