import { Browsers } from "../types/browsers.js";
import os from "os";

// TODO: check the cache locations for each browser
export const browsers: Browsers = [
  {
    name: "Chrome",
    winPath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    macPath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    linuxPath: "/usr/bin/google-chrome",
    winCache: `C:/Users/${os.userInfo().username}/AppData/Local/Google/Chrome/User Data`,
    macCache: `${os.homedir()}/Library/Application Support/Google/Chrome`,
    linuxCache: `${os.homedir()}/.config/google-chrome`,
  },
  {
    name: "Chromium",
    winPath: "C:/Program Files/Chromium/Application/chrome.exe",
    macPath: "/Applications/Chromium.app/Contents/MacOS/Chromium",
    linuxPath: "/usr/bin/chromium",
    winCache: `C:/Users/${os.userInfo().username}/AppData/Local/Chromium/User Data`,
    macCache: `${os.homedir()}/Library/Application Support/Chromium`,
    linuxCache: `${os.homedir()}/.config/chromium`,
  },
  {
    name: "Firefox",
    winPath: "C:/Program Files/Mozilla Firefox/firefox.exe",
    macPath: "/Applications/Firefox.app/Contents/MacOS/firefox",
    linuxPath: "/usr/bin/firefox",
    winCache: `C:/Users/${os.userInfo().username}/AppData/Local/Mozilla/Firefox/Profiles`,
    macCache: `${os.homedir()}/Library/Application Support/Firefox/Profiles`,
    linuxCache: `${os.homedir()}/.mozilla/firefox`,
  },
  {
    name: "Edge",
    winPath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    macPath: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    linuxPath: "/usr/bin/microsoft-edge",
    winCache: `C:/Users/${os.userInfo().username}/AppData/Local/Microsoft/Edge/User Data`,
    macCache: `${os.homedir()}/Library/Application Support/Microsoft Edge`,
    linuxCache: `${os.homedir()}/.config/microsoft-edge`,
  },
  {
    name: "Brave",
    winPath:
      "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
    macPath: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    linuxPath: "/usr/bin/brave",
    winCache: `C:/Users/${os.userInfo().username}/AppData/Local/BraveSoftware/Brave-Browser/User Data`,
    macCache: `${os.homedir()}/Library/Application Support/BraveSoftware/Brave-Browser`,
    linuxCache: `${os.homedir()}/.config/BraveSoftware/Brave-Browser`,
  },
  {
    name: "Arc",
    winPath: undefined,
    macPath: "/Applications/ARC.app/Contents/MacOS/ARC",
    linuxPath: undefined,
    winCache: undefined,
    macCache: `${os.homedir()}/Library/Application Support/ARC`,
    linuxCache: undefined,
  },
];
