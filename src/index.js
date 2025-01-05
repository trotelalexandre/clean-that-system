import { checkCPU } from "./modules/cpu.js";
import { checkMemory } from "./modules/memory.js";
import { checkDisk } from "./modules/disk.js";
import { checkNetwork } from "./modules/network.js";
import { checkBrowserCache } from "./modules/browserCache.js";
import { manageDockerImages } from "./modules/docker.js";
import { promptAction } from "./utils/prompts.js";
import { displayMessage } from "./utils/display.js";
import { displaySystemInfo } from "./utils/system.js";

async function inspectSystem({ dryRun, backupCache }) {
  // display system information
  await displaySystemInfo();

  const advice = [];
  const actions = [];

  // check cpu
  await checkCPU(advice, actions);

  // check memory
  await checkMemory(advice, actions);

  // check disk
  await checkDisk(advice, actions);

  // check network
  await checkNetwork(advice, actions);

  // check browser cache
  await checkBrowserCache(advice, actions, { backupCache });

  // manage docker images
  await manageDockerImages(advice, actions);

  if (advice.length > 0) {
    displayMessage("Clean That System - Advice", advice.join("\n"), "yellow");
    promptAction(actions, dryRun);
  } else {
    displayMessage("System OK", "No issues detected.", "green");
  }
}

export { inspectSystem };
