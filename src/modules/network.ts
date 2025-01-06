import { networkStats as _networkStats } from "systeminformation";
import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function checkNetwork(advice: string[], actions: Actions) {
  const networkStats = await _networkStats();

  const highNetworkUsage = networkStats.some((net) => net.rx_bytes > 50000000); // 50 MB
  if (highNetworkUsage) {
    advice.push(
      "High network usage detected. Limit bandwidth usage or disconnect unnecessary devices."
    );
    actions.push({
      description: "Check network usage",
      execute: () => {
        const command =
          process.platform === "win32" ? "netstat -e" : "netstat -i";
        execSync(command, { stdio: "inherit" });
      },
    });
  }
}

export { checkNetwork };
