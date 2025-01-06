import { execSync } from "child_process";

async function manageDockerImages(advice, actions) {
  advice.push("Consider cleaning up unused Docker images.");
  actions.push({
    description: "List Docker images",
    execute: () => execSync("docker images", { stdio: "inherit" }),
  });
  actions.push({
    description: "Remove unused Docker images",
    execute: () => execSync("docker system prune -a", { stdio: "inherit" }),
  });
}

export { manageDockerImages };
