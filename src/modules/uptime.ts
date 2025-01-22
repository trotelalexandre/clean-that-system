import { uptime } from "os";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checUptime(advice: string[], actions: Actions) {
  const uptimeHours = uptime() / 3600;

  if (uptimeHours > 48) {
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

export { checUptime };
