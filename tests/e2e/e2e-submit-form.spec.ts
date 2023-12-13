import { test, expect } from "@playwright/test";

test.describe("Feedback form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#feeback");
  });

  // Reset feedback form
  test("Reset feedback form", async ({ page }) => {
    await page.fill("#name", "some name");
    await page.fill("#email", "some_email@email.com");
    await page.fill("#subject", "some subject");
    await page.fill("#comment", "some comments");
  });

  // Submit feedback form
});
