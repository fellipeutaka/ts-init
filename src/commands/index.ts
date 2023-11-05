import chalk from "chalk";
import { Command } from "commander";

import { version } from "../../package.json";
import { init } from "./init";

export const program = new Command();

program.version(version);

program
  .command("init")
  .description("Create a new tsconfig.json file")
  .action(async () => {
    try {
      await init();
    } catch (err) {
      console.log(chalk.red((err as Error).message));
      process.exit(1);
    }
  });
