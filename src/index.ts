import { checkCPU } from "./modules/cpu.js";
import { checkMemory } from "./modules/memory.js";
import { checkDisk } from "./modules/disk.js";
import { checkNetwork } from "./modules/network.js";
import { checkBrowserCache } from "./modules/browserCache.js";
import { manageDockerImages } from "./modules/docker.js";
import { promptAction } from "./utils/prompts.js";
import { displayMessage } from "./utils/display.js";
import { displaySystemInfo } from "./utils/system.js";
import { checkUptime } from "./modules/uptime.js";
import { Actions } from "./types/core.js";
import { execSync } from "node:child_process";
import { checkTrash } from "./modules/trash.js";

interface InspectSystemOptions {
  dryRunFlag: boolean;
  backupCacheFlag: boolean;
}

async function inspectSystem({ dryRunFlag }: InspectSystemOptions) {
  // display system information
  await displaySystemInfo();

  const advices: string[] = [];
  const actions: Actions = [];
  const errors: string[] = [];

  // check cpu
  await checkCPU(advices, actions);

  // check memory
  await checkMemory(advices, actions);

  // check disk
  await checkDisk(advices, actions);

  // check network
  await checkNetwork(advices, actions);

  // check browser cache
  await checkBrowserCache(advices, actions);

  // check uptime
  await checkUptime(advices, actions);

  // check trash
  await checkTrash(advices, actions, errors);

  // manage docker images (if daemon is running only)
  try {
    execSync("docker info", { stdio: "ignore" });
    await manageDockerImages(advices, actions);
  } catch {
    advices.push(
      "Docker daemon is not running. Skipping Docker image management."
    );
  }

  if (errors.length > 0) {
    displayMessage(
      `Clean That System - Error${errors.length > 1 ? "s" : ""}`,
      errors.join("\n"),
      "red"
    );
  }

  if (advices.length > 0) {
    displayMessage(
      `Clean That System - Advice${advices.length > 1 ? "s" : ""}`,
      advices.join("\n"),
      "yellow"
    );
    promptAction(actions, dryRunFlag);
  } else {
    displayMessage("System OK", "No issues detected.", "green");
  }
}

export { inspectSystem };
