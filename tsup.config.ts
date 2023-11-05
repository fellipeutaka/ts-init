import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bin.ts"],
  bundle: true,
  clean: true,
  format: ["esm"],
  platform: "node",
  minify: true,
});
