import chalk from "chalk";
import inquirer from "inquirer";
import fs from "node:fs";
import { describe, it, expect, vi } from "vitest";

import { type Answers, init } from "./init";

describe("tsconfig generator CLI", () => {
  it("should generate a tsconfig.json file with the provided options", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    vi.spyOn(inquirer, "prompt").mockImplementation(
      async () =>
        ({
          strictness: true,
          transpilingWithTypeScript: false,
          runsInTheDOM: false,
          library: false,
          libraryMonorepo: false,
        }) satisfies Answers,
    );
    vi.spyOn(fs, "writeFileSync");
    vi.spyOn(global.console, "log").mockImplementation(() => {});

    await init();

    expect(fs.writeFileSync).toHaveBeenCalledOnce();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "tsconfig.json",
      JSON.stringify(
        {
          compilerOptions: {
            esModuleInterop: true,
            skipLibCheck: true,
            target: "es2022",
            verbatimModuleSyntax: true,
            allowJs: true,
            resolveJsonModule: true,
            moduleDetection: "force",
            strict: true,
            noUncheckedIndexedAccess: true,
            moduleResolution: "Bundler",
            module: "ESNext",
            noEmit: true,
            lib: ["es2022"],
          },
        },
        null,
        2,
      ),
    );
    expect(console.log).toHaveBeenCalledWith(
      chalk.green("tsconfig.json file created!"),
    );
  });

  it("should NOT generate a tsconfig.json file if a tsconfig.json already exists", async () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    vi.spyOn(process, "exit").mockReturnValue(0 as never);
    vi.spyOn(global.console, "log").mockImplementation(() => {});
    vi.spyOn(fs, "writeFileSync");

    expect(init()).rejects.toThrowError("tsconfig.json already exists");

    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
