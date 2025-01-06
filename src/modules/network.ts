import { networkStats as _networkStats } from "systeminformation";
import { execSync } from "child_process";

async function checkNetwork(advice, actions) {
  const networkStats = await _networkStats();

  const highNetworkUsage = networkStats.some((net) => net.rx_bytes > 50000000); // 50 MB
  if (highNetworkUsage) {
    advice.push(
      "High network usage detected. Limit bandwidth usage or disconnect unnecessary devices."
    );
    actions.push({
      description: "Check network usage",
      execute: () => execSync("netstat -i", { stdio: "inherit" }),
    });
  }
}

export { checkNetwork };
