import { totalmem, freemem } from "os";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";
import { MEMORY_USAGE_LIMIT } from "../data/params.js";

async function checkMemory(advice: string[], actions: Actions) {
  const totalMemory = totalmem();
  const freeMemory = freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = usedMemory / totalMemory;

  if (memoryUsage > MEMORY_USAGE_LIMIT) {
    advice.push("Memory usage is high. Try closing unnecessary programs.");
    actions.push({
      description: "List top memory-consuming processes",
      execute: () => {
        const command =
          process.platform === "win32"
            ? 'powershell -Command "Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10"'
            : process.platform === "darwin"
              ? "top -o mem -n 10"
              : "top -b -o +%MEM | head -n 20";
        execSync(command, {
          stdio: "inherit",
        });
      },
    });
  }
}

export { checkMemory };
