import chalk from "chalk";
import boxen from "boxen";

function displayMessage(title, message, color) {
  console.log(
    boxen(chalk[color](message), {
      title,
      titleAlignment: "center",
      padding: 1,
      margin: 1,
      borderStyle: "round",
    })
  );
}

export { displayMessage };
