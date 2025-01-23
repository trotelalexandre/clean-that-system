export type BrowserName =
  | "Chrome"
  | "Firefox"
  | "Edge"
  | "Brave"
  | "Arc"
  | "Chromium";

export type Browser = {
  name: BrowserName;
  winPath: string | undefined;
  macPath: string | undefined;
  linuxPath: string | undefined;
  winCache: string | undefined;
  macCache: string | undefined;
  linuxCache: string | undefined;
};

export type Browsers = Browser[];
