import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  test(`visual QA: ${viewport.name}`, async ({ page }) => {
    await mkdir("output/playwright", { recursive: true });
    await page.setViewportSize(viewport);
    await page.goto("es/", { waitUntil: "networkidle" });
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: `output/playwright/home-${viewport.name}.png`,
      fullPage: true,
    });
  });
}
