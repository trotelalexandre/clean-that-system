import { checkCPU } from "./modules/cpu";
import { checkMemory } from "./modules/memory";
import { checkDisk } from "./modules/disk";
import { checkNetwork } from "./modules/network";
import { checkBrowserCache } from "./modules/browserCache";
import { manageDockerImages } from "./modules/docker";
import { promptAction } from "./utils/prompts";
import { displayMessage } from "./utils/display";

async function inspectSystem({ dryRun, backupCache }) {
  displayMessage("Clean That System", "Inspecting system...", "green");

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
    displayMessage("Advice", advice.join("\n"), "yellow");
    promptAction(actions, dryRun);
  } else {
    displayMessage("System OK", "No issues detected.", "green");
  }
}

export default { inspectSystem };
