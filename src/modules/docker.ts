import { execSync } from "child_process";
import { Actions } from "../types/core.js";

async function manageDockerImages(advice: string[], actions: Actions) {
  try {
    const result = execSync("docker images -f dangling=true -q").toString();
    if (result) {
      advice.push("Consider cleaning up unused Docker images.");
      actions.push({
        description: "Prune unused Docker images",
        execute: () => {
          const command = "docker image prune -a -f";
          execSync(command, { stdio: "inherit" });
        },
      });
    }
  } catch {
    advice.push(
      "Failed to check Docker images. Ensure Docker is installed and running."
    );
  }
}

export { manageDockerImages };
