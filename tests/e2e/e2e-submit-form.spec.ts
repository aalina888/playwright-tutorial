import { test, expect } from "@playwright/test";

test.describe("Feedback form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#feedback");
  });

  // Reset feedback form
  test("Reset feedback form", async ({ page }) => {
    await page.fill("#name", "some name");
    await page.fill("#email", "some_email@email.com");
    await page.fill("#subject", "some subject");
    await page.fill("#comment", "some comments about the application");
    await page.click("input[name='clear']");

    const nameInput = page.locator("#name");
    const commentInput = page.locator("#comment");
    await expect(nameInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });

  // Submit feedback form
  test("Submit feedback form", async ({ page }) => {
    await page.fill("#name", "some name");
    await page.fill("#email", "some_email@email.com");
    await page.fill("#subject", "some subject");
    await page.fill("#comment", "some comments about the application");
    await page.click("input[type='submit']");

    await page.waitForSelector("#feedback-title");
  });
});
