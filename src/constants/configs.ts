export const baseOptions = {
  esModuleInterop: true,
  skipLibCheck: true,
  target: "es2022",
  verbatimModuleSyntax: true,
  allowJs: true,
  resolveJsonModule: true,
  moduleDetection: "force",
};

export const strictnessOptions = {
  strict: true,
  noUncheckedIndexedAccess: true,
};

export const transpilingWithTypeScriptOptions = {
  moduleResolution: "NodeNext",
  module: "NodeNext",
  outDir: "dist",
  sourceMap: true,
};

export const notTranspilingWithTypeScriptOptions = {
  moduleResolution: "Bundler",
  module: "ESNext",
  noEmit: true,
};

export const runsInTheDOMOptions = {
  lib: ["es2022", "dom", "dom.iterable"],
};

export const doesNotRunsInTheDOMOptions = {
  lib: ["es2022"],
};

export const libraryOptions = {
  declaration: true,
};

export const libraryMonorepoOptions = {
  composite: true,
  declarationMap: true,
};
