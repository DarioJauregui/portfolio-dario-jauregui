import { defineConfig } from "@playwright/test";

const basePath = (
  process.env.BASE_PATH ||
  (process.env.GITHUB_PAGES === "true" ? "/portfolio-dario-jauregui" : "")
).replace(/\/$/, "");
const base = basePath ? `${basePath}/` : "/";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  reporter: "line",
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve-dist.mjs",
    url: `http://127.0.0.1:4173${base}es/`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
