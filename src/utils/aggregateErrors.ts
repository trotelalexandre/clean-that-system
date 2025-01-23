export function aggregatedErrors(errors: Map<string, Set<string>>): string {
  const getCommonRoot = (dirs: string[]): string => {
    const [firstDir] = dirs;
    return dirs.reduce((commonRoot, dir) => {
      let i = 0;
      while (
        i < commonRoot.length &&
        i < dir.length &&
        commonRoot[i] === dir[i]
      ) {
        i++;
      }
      return commonRoot.slice(0, i);
    }, firstDir);
  };

  const commonRoot = getCommonRoot(Array.from(errors.keys()));

  const aggregatedErrors = Array.from(errors.entries()).reduce(
    (acc: { [key: string]: Set<string> }, [parentDir, paths]) => {
      const rootDir = parentDir.startsWith(commonRoot)
        ? parentDir.split("/").slice(0, 3).join("/")
        : parentDir.split("/").slice(0, 2).join("/");

      if (!acc[rootDir]) {
        acc[rootDir] = new Set();
      }
      paths.forEach((path) => acc[rootDir].add(path));

      return acc;
    },
    {}
  );

  const errorMessages = Object.entries(aggregatedErrors)
    .map(([rootDir, paths]) => {
      const count = paths.size;
      return `Failed to read ${count} item${count > 1 ? "s" : ""} in directory: ${rootDir}`;
    })
    .join("\n");

  return errorMessages;
}
