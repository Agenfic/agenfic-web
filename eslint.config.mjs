import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const config = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"]
  }),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "*.html",
      "*.html.gz",
      "*.txt",
      "_ag_chunk.js",
      "marketing-homepage-runtime.js",
      "next-env.d.ts",
      "scripts/**/*.cjs",
      "types/**/*.d.ts"
    ]
  }
];

export default config;
