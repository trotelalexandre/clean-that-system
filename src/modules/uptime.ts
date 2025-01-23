import { uptime } from "os";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";
import { UPTIME_HOURS_LIMIT } from "../data/params.js";

async function checkUptime(advice: string[], actions: Actions) {
  const uptimeHours = uptime() / 3600;

  if (uptimeHours > UPTIME_HOURS_LIMIT) {
    advice.push(
      "System has been running for a long time. Consider restarting."
    );
    actions.push({
      description: "Restart the system",
      execute: () => {
        const command =
          process.platform === "win32"
            ? "shutdown /r /t 0"
            : "sudo shutdown -r now";
        execSync(command, { stdio: "inherit" });
      },
    });
  }
}

export { checkUptime };
