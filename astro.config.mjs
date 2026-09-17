import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const repository = "portfolio-dario-jauregui";
const isPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  output: "static",
  site: process.env.SITE_URL ?? `https://dariojauregui.github.io/${repository}`,
  base: isPages ? `/${repository}` : "/",
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
