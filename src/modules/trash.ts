import os from "os";
import { execSync } from "child_process";
import { Actions } from "types/core";
import { join } from "path";
import { getDirectorySize } from "../utils/getDirectorySize.js";

async function checkTrash(
  advice: string[],
  actions: Actions,
  errors: Map<string, Set<string>>
) {
  let trashSize = 0;

  try {
    if (process.platform === "win32") {
      const recycleBinPath = join(os.homedir(), "Recycle.Bin");
      trashSize = getDirectorySize(recycleBinPath, errors);
    } else if (process.platform === "darwin") {
      const trashPath = join(os.homedir(), ".Trash");
      trashSize = getDirectorySize(trashPath, errors);
    } else {
      const trashPath = join(os.homedir(), ".local/share/Trash");
      trashSize = getDirectorySize(trashPath, errors);
    }
  } catch {
    const errorMessage = "Failed to check trash size.";
    if (!errors.has("Trash")) {
      errors.set("Trash", new Set<string>());
    } else {
      errors.get("Trash")?.add(errorMessage);
    }
  }

  if (trashSize > 0) {
    advice.push("Trash is not empty.");
    actions.push({
      description: "Empty trash",
      execute: () => {
        try {
          const command =
            process.platform === "win32"
              ? "rd /s /q $env:Recycle.Bin"
              : process.platform === "darwin"
                ? "sudo rm -rf ~/.Trash/*"
                : "sudo rm -rf ~/.local/share/Trash/*";

          execSync(command, { stdio: "inherit" });
        } catch {
          const errorMessage = "Failed to empty trash.";
          if (!errors.has("Trash")) {
            errors.set("Trash", new Set<string>());
          } else {
            errors.get("Trash")?.add(errorMessage);
          }
        }
      },
    });
  }
}

export { checkTrash };
