import { totalmem, freemem } from "os";
import { execSync } from "child_process";

async function checkMemory(advice, actions) {
  const totalMemory = totalmem() / 1024 / 1024; // MB
  const freeMemory = freemem() / 1024 / 1024; // MB
  const usedMemory = totalMemory - freeMemory;
  const memoryUsage = (usedMemory / totalMemory) * 100;

  if (memoryUsage > 75) {
    advice.push("Memory usage is high. Try closing unnecessary programs.");
    actions.push({
      description: "List top memory-consuming processes",
      execute: () =>
        execSync("ps -eo pid,ppid,cmd,%mem --sort=-%mem | head", {
          stdio: "inherit",
        }),
    });
  }
}

export { checkMemory };
