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
  console.log(
    boxen(osInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "blue",
      title: "System Information",
    })
  );

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
  console.log(
    boxen(cpuInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "yellow",
      title: "CPU Information",
    })
  );

  // Memory info
  const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
  const memoryInfo = `${chalk.bold("Memory:")} ${chalk.cyan(
    `${freeMem} GB free / ${totalMem} GB total`
  )}`;
  console.log(
    boxen(memoryInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "magenta",
      title: "Memory Information",
    })
  );

  // Disk info
  const disks = await si.fsSize();
  const diskInfo = disks
    .map(
      (disk, index) =>
        `${chalk.bold(`Disk ${index + 1}:`)} ${chalk.cyan(
          `${disk.fs} (${(disk.size / 1024 / 1024 / 1024).toFixed(
            2
          )} GB total, ${disk.use}% used)`
        )}`
    )
    .join("\n");
  console.log(
    boxen(diskInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "green",
      title: "Disk Information",
    })
  );

  // Network info
  const networkInterfaces = os.networkInterfaces();
  const networkInfo = Object.entries(networkInterfaces)
    .map(([name, interfaces]) =>
      interfaces
        ?.filter((iface) => !iface.internal)
        ?.map(
          (iface) =>
            `${chalk.bold(`Network Interface: ${name}`)}
  ${chalk.bold("IP Address:")} ${chalk.cyan(iface.address)}
  ${chalk.bold("MAC Address:")} ${chalk.cyan(iface.mac)}`
        )
        .join("\n")
    )
    ?.filter((info) => (info ? info.length > 0 : false))
    ?.join("\n\n");
  console.log(
    boxen(networkInfo, {
      padding: 1,
      borderStyle: "round",
      borderColor: "cyan",
      title: "Network Information",
    })
  );
}

export { displaySystemInfo };
