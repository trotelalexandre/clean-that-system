import { cpuUsage as _cpuUsage } from "os-utils";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checkCPU(advices: string[], actions: Actions) {
  _cpuUsage((cpuUsage) => {
    if (cpuUsage > 0.8) {
      advices.push(
        "High CPU usage detected. Consider closing heavy applications.",
      );
      actions.push({
        description: "List top CPU-consuming processes",
        execute: () =>
          execSync("ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head", {
            stdio: "inherit",
          }),
      });
    }
  });
}

export { checkCPU };
