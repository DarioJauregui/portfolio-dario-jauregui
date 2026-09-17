import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 900 },
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
    if (viewport.name === "desktop")
      expect(
        await page.evaluate(() => document.documentElement.scrollHeight),
      ).toBeLessThan(7000);
    await page.screenshot({
      path: `output/playwright/home-${viewport.name}.png`,
      fullPage: true,
    });
  });
}

for (const viewport of [viewports[0], viewports[3]]) {
  test(`case study visual QA: ${viewport.name}`, async ({ page }) => {
    await mkdir("output/playwright", { recursive: true });
    await page.setViewportSize(viewport);
    await page.goto("es/work/p003/", { waitUntil: "networkidle" });
    await expect(page.locator("main h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: `output/playwright/case-p003-${viewport.name}.png`,
      fullPage: true,
    });
  });
}
