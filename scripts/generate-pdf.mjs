import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { startServer } from "./serve-dist.mjs";

const base =
  process.env.GITHUB_PAGES === "true" ? "/portfolio-dario-jauregui" : "";
const origin = `http://127.0.0.1:${process.env.PORT || 4173}`;
const output = new URL("../public/downloads/", import.meta.url);
await mkdir(output, { recursive: true });

const server = await startServer();
const browser = await chromium.launch({ headless: true });

try {
  for (const lang of ["es", "en"]) {
    for (const document of ["portfolio", "cv"]) {
      const page = await browser.newPage();
      await page.goto(
        `${origin}${base}/${lang}/${document === "portfolio" ? "print" : "cv"}/`,
        { waitUntil: "networkidle" },
      );
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: fileURLToPath(
          new URL(`dario-jauregui-${document}-${lang}.pdf`, output),
        ),
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: true,
        headerTemplate: "<span></span>",
        footerTemplate: `<div style="width:100%;font:7px Arial,sans-serif;color:#666;padding:0 13mm;display:flex;justify-content:space-between"><span>Darío Jáuregui · ${document === "portfolio" ? "Portfolio" : "CV"}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
        margin: { top: "14mm", right: "13mm", bottom: "16mm", left: "13mm" },
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

console.log("Generated ES/EN portfolio and CV PDFs in public/downloads.");
