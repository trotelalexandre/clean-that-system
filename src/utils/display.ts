import chalk from "chalk";
import boxen from "boxen";

type ChalkColor = keyof typeof chalk;

function displayMessage(title: string, message: string, color: ChalkColor) {
  const chalkFunction = chalk[color] as (msg: string) => string;
  console.log(
    boxen(chalkFunction(message), {
      title,
      padding: 1,
      borderStyle: "round",
    })
  );
}

export { displayMessage };
