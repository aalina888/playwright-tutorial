import { expect, test } from "@playwright/test";

test("Simple basic test", async ({ page }) => {
  await page.goto("https://www.example.com");

  const pageTitle = page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain --fdf");
});

test("Clicking on elements", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.click("text=Sign in");
  const errorMessage = page.locator(".alert-error");
  await expect(errorMessage).toContainText("Login and/or password are wrong.");
});
