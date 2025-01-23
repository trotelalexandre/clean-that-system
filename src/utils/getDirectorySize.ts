import { readdirSync, statSync } from "fs";
import { dirname, join } from "path";

export function getDirectorySize(
  directory: string,
  errors: Map<string, Set<string>>
): number {
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
        const parentDir = dirname(filePath);
        if (!errors.has(parentDir)) {
          errors.set(parentDir, new Set());
        }
        errors.get(parentDir)?.add(filePath);
      }
    });
  } catch {
    const parentDir = dirname(directory);
    if (!errors.has(parentDir)) {
      errors.set(parentDir, new Set());
    }
    errors.get(parentDir)?.add(directory);
  }

  return totalSize;
}
