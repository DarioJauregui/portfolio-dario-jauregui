import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const repository = "portfolio-dario-jauregui";
const isPages = process.env.GITHUB_PAGES === "true";
const site =
  process.env.SITE_URL || `https://dariojauregui.github.io/${repository}`;
const base = process.env.BASE_PATH || (isPages ? `/${repository}` : "/");

export default defineConfig({
  output: "static",
  site,
  base,
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
