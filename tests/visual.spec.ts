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
    await expect(page.locator(".project-media img")).toHaveCount(3);
    for (const image of await page.locator(".project-media img").all())
      await image.scrollIntoViewIfNeeded();
    expect(
      await page
        .locator(".project-media img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0 &&
              getComputedStyle(image).objectFit === "contain" &&
              Math.abs(
                image.clientWidth / image.clientHeight -
                  image.naturalWidth / image.naturalHeight,
              ) < 0.02,
          ),
        ),
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    if (viewport.name === "desktop") {
      expect(
        await page
          .locator("#projects")
          .evaluate((section) => section.clientHeight),
      ).toBeLessThanOrEqual(viewport.height);
    }
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
    for (const code of ["p001", "p002", "p003"]) {
      await page.goto(`es/work/${code}/`, { waitUntil: "networkidle" });
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
      await page.screenshot({
        path: `output/playwright/case-${code}-${viewport.name}.png`,
        fullPage: true,
      });
    }
  });
}
