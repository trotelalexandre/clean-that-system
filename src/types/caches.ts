export type Cache = {
  name: string;
  description: string;
  macPath: string | undefined;
  winPath: string | undefined;
  linuxPath: string | undefined;
};

export type Caches = Cache[];
