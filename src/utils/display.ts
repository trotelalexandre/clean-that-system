import chalk from "chalk";
import boxen from "boxen";

function displayMessage(title: string, message: string, color: string) {
  console.log(
    boxen(chalk[color](message), {
      title,
      titleAlignment: "center",
      padding: 1,
      borderStyle: "round",
    })
  );
}

export { displayMessage };
