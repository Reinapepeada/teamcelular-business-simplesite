import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  // .claude/worktrees son checkouts de otras ramas: cada una se valida en su propio PR.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**"]),
]);
