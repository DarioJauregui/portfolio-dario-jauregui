import { expect, test } from "@playwright/test";

test("home, language and selected work are navigable", async ({ page }) => {
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  await page.goto("es/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Darío");
  await expect(page.locator(".featured-card")).toHaveCount(4);
  await expect(page.locator(".project-areas, .specialties")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/CV|Currículum/);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/$/);
  await expect(
    page.getByText("Featured projects", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("body")).not.toContainText("24.8k");
  expect(errors).toEqual([]);
});

for (const code of ["p001", "p002", "p003", "p007"]) {
  test(`${code} case study and print routes respond`, async ({
    page,
    request,
  }) => {
    await page.goto(`es/work/${code}/`);
    await expect(page.locator("main.case-study h1")).toBeVisible();
    await expect(
      page.getByText("Implementación técnica", { exact: true }),
    ).toBeVisible();
    await expect(page.locator("body")).not.toContainText(
      "Límites de publicación",
    );
    await expect(page.locator("body")).not.toContainText("Internal safe");
    expect((await request.get(`es/print/`)).ok()).toBeTruthy();
    expect((await request.get(`en/print/`)).ok()).toBeTruthy();
  });
}

test("PDF downloads and 404 are present", async ({ request }) => {
  for (const file of ["portfolio-es", "portfolio-en"]) {
    const response = await request.get(`downloads/dario-jauregui-${file}.pdf`);
    expect(response.ok(), file).toBeTruthy();
    expect((await response.body()).byteLength).toBeGreaterThan(10_000);
  }
  for (const route of [
    "es/cv/",
    "en/cv/",
    "downloads/dario-jauregui-cv-es.pdf",
    "downloads/dario-jauregui-cv-en.pdf",
  ])
    expect((await request.get(route)).status(), route).toBe(404);
  expect((await request.get("missing-route/")).status()).toBe(404);
});
