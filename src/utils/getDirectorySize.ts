import { readdirSync, statSync } from "fs";
import { join } from "path";

export function getDirectorySize(directory: string, errors: string[]): number {
  let totalSize = 0;

  try {
    const files = readdirSync(directory);

    files.forEach((file) => {
      const filePath = join(directory, file);
      try {
        const stats = statSync(filePath);
        if (stats.isDirectory()) {
          totalSize += getDirectorySize(filePath, errors);
        } else {
          totalSize += stats.size;
        }
      } catch {
        errors.push(`Failed to read file ${filePath}`);
      }
    });
  } catch {
    errors.push(`Failed to read directory ${directory}`);
  }

  return totalSize;
}
