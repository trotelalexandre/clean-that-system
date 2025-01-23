import { Caches } from "../types/caches";
import os from "os";

export const caches: Caches = [
  {
    name: "System-wide applications cache",
    macPath: `/Library/Caches`,
    winPath: `C:\\Windows\\Temp`,
    linuxPath: `/var/cache`,
    description:
      "Shared temporary files and application caches across the system",
  },
  {
    name: "User applications cache",
    macPath: `${os.homedir()}/Library/Caches`,
    winPath: `${os.homedir()}\\AppData\\Local\\Temp`,
    linuxPath: `${os.homedir()}/.cache`,
    description: "User-specific application caches and temporary files",
  },
  {
    name: "System logs",
    macPath: `/Library/Logs`,
    winPath: `C:\\Windows\\Logs`,
    linuxPath: `/var/log`,
    description: "System-level log files and diagnostic information",
  },
  {
    name: "User logs",
    macPath: `${os.homedir()}/Library/Logs`,
    winPath: `${os.homedir()}\\AppData\\Local\\Temp`,
    linuxPath: `${os.homedir()}/.local/share/logs`,
    description: "User-specific application log files",
  },
  {
    name: "Temporary files",
    macPath: `/private/var/folders`,
    winPath: `${os.homedir()}\\AppData\\Local\\Temp`,
    linuxPath: `/tmp`,
    description: "Short-lived temporary files and working directories",
  },
  {
    name: "Application states",
    macPath: `${os.homedir()}/Library/Saved Application State`,
    winPath: `${os.homedir()}\\AppData\\Local\\Packages`,
    linuxPath: `${os.homedir()}/.local/share/application-states`,
    description: "Saved application states and recent session information",
  },
];
