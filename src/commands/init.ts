import chalk from "chalk";
import inquirer, { type QuestionCollection } from "inquirer";
import fs from "node:fs";
import path from "node:path";

const questions = [
  {
    type: "confirm",
    name: "strictness",
    message: "Do you want strictness?",
    default: true,
  },
  {
    type: "confirm",
    name: "transpilingWithTypeScript",
    message: "Are you transpiling TypeScript?",
    default: false,
  },
  {
    type: "confirm",
    name: "runsInTheDOM",
    message: "Does your code run in the DOM?",
    default: false,
  },
  {
    type: "confirm",
    name: "library",
    message: "Is your code a library?",
    default: false,
  },
  {
    type: "confirm",
    name: "libraryMonorepo",
    message: "Is your library a monorepo?",
    default: false,
    when: (answers) => answers.library,
  },
] as const satisfies QuestionCollection;

export type Answers = Record<(typeof questions)[number]["name"], boolean>;

export async function promptUserForTsConfigOptions() {
  return await inquirer.prompt<Answers>(questions);
}

export async function generateTsConfigFile(answers: Answers) {
  const {
    strictness,
    transpilingWithTypeScript,
    runsInTheDOM,
    library,
    libraryMonorepo,
  } = answers;

  const {
    baseOptions,
    strictnessOptions,
    transpilingWithTypeScriptOptions,
    notTranspilingWithTypeScriptOptions,
    runsInTheDOMOptions,
    doesNotRunsInTheDOMOptions,
    libraryOptions,
    libraryMonorepoOptions,
  } = await import("../constants/configs");

  const config = {
    compilerOptions: {
      ...baseOptions,
      ...(strictness ? strictnessOptions : {}),
      ...(transpilingWithTypeScript
        ? transpilingWithTypeScriptOptions
        : notTranspilingWithTypeScriptOptions),
      ...(runsInTheDOM ? runsInTheDOMOptions : doesNotRunsInTheDOMOptions),
      ...(library ? libraryOptions : {}),
      ...(libraryMonorepo ? libraryMonorepoOptions : {}),
    },
  };

  fs.writeFileSync("tsconfig.json", JSON.stringify(config, null, 2));
}
export async function init() {
  if (fs.existsSync(path.resolve(process.cwd(), "tsconfig.json"))) {
    throw new Error("tsconfig.json already exists");
  }

  const answers = await promptUserForTsConfigOptions();
  await generateTsConfigFile(answers);

  console.log(chalk.green("tsconfig.json file created!"));
}
