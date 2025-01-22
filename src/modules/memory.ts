import { totalmem, freemem } from "os";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checkMemory(advice: string[], actions: Actions) {
  const totalMemory = totalmem() / 1024 / 1024; // MB
  const freeMemory = freemem() / 1024 / 1024; // MB
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = (usedMemory / totalMemory) * 100;

  if (memoryUsage > 75) {
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
