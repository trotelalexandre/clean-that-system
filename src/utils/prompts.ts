import readline from "readline";
import chalk from "chalk";
import process from "node:process";
import { Actions } from "../types/core.js";

function promptAction(actions: Actions, dryRunFlag: boolean) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  if (actions.length === 0) {
    rl.close();
    return;
  }

  actions.push({
    description: "Exit without making any changes",
    execute: () => {
      console.log(chalk.yellow("\nExiting without making any changes."));
    },
  });

  console.log(chalk.yellow("\nAvailable actions:"));
  actions.forEach((action, index) => {
    console.log(`${index + 1}. ${action.description}`);
    if (action.explanation) {
      console.log(`   ${action.explanation}`);
    }
  });

  rl.question(
    chalk.blue("\nEnter the number of the action to execute: "),
    (answer) => {
      const choice = parseInt(answer, 10);
      if (choice >= 1 && choice <= actions.length) {
        console.log(
          chalk.green(`\nExecuting: ${actions[choice - 1].description}\n`)
        );
        if (dryRunFlag) {
          console.log(chalk.gray("Dry run enabled. No changes will be made."));
        } else {
          actions[choice - 1].execute();
        }
      } else {
        console.log(chalk.red("Invalid choice. Exiting."));
      }
      rl.close();
    }
  );
}

export { promptAction };
