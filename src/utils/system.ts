import os from "os";
import si from "systeminformation";
import chalk from "chalk";
import boxen from "boxen";

async function displaySystemInfo() {
  // General info
  const osInfo = `${chalk.bold("OS:")} ${chalk.cyan(
    `${os.type()} ${os.release()} (${os.arch()})`
  )}
${chalk.bold("Hostname:")} ${chalk.cyan(os.hostname())}
${chalk.bold("Uptime:")} ${chalk.cyan(
    `${Math.floor(os.uptime() / 3600)} hours`
  )}`;

  // CPU info
  const cpu = os.cpus()[0];
  const cpuInfo = `${chalk.bold("CPU:")} ${chalk.cyan(cpu.model)}
${chalk.bold("Cores:")} ${chalk.cyan(os.cpus().length)}
${chalk.bold("Load Average:")} ${chalk.cyan(
    os
      .loadavg()
      .map((load) => load.toFixed(2))
      .join(", ")
  )}`;

  // Memory info
  const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
  const memoryInfo = `${chalk.bold("Memory:")} ${chalk.cyan(
    `${freeMem} GB free / ${totalMem} GB total`
  )}`;

  // Main disk info
  const disks = await si.fsSize();
  const mainDisk = disks[0];
  const mainDiskInfo = `${chalk.bold("Disk:")} ${chalk.cyan(
    `${mainDisk.fs} (${(mainDisk.size / 1024 / 1024 / 1024).toFixed(
      2
    )} GB total, ${(mainDisk.available / 1024 / 1024 / 1024).toFixed(2)} GB free)`
  )}`;

  // Network speed info (later)
  const networkSpeedInfo = `${chalk.bold("Network:")} ${chalk.cyan("Not available yet")}`;

  // Display system info
  const systemInfo = `${osInfo}\n\n${cpuInfo}\n\n${memoryInfo}\n\n${mainDiskInfo}\n\n${networkSpeedInfo}`;

  console.log(
    boxen(systemInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "blue",
      title: "System Information",
    })
  );
}

export { displaySystemInfo };
