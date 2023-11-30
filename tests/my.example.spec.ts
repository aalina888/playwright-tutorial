import { expect, test } from "@playwright/test";

test("Simple basic test", async ({ page }) => {
  await page.goto("https://www.example.com");

  const pageTitle = page.locator("h1");
  await expect(pageTitle).toContainText("Example Domain");
});

test("Clicking on elements", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html");
  await page.click("#signin_button");
  await page.click("text=Sign in");
  const errorMessage = page.locator(".alert-error");
  await expect(errorMessage).toContainText("Login and/or password are wrong.");
});

test.skip("Selectors", async ({ page }) => {
  // text
  await page.click("text=Some text");

  // css
  await page.click("button");
  await page.click("#id");
  await page.click(".class");

  // Only visible css selector
  await page.click(".submit-button:visible");

  // Combinations
  await page.click("#username .first");

  // xpath
  await page.click("//button");
});

test.describe.only("My first test suite", () => {
  test("Working with inputs", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");

    await page.fill("#user_login", "some username");
    await page.fill("#user_password", "some password");
    await page.click("[name=submit]");

    const errorMessage = page.locator(".alert-error");
    await expect(errorMessage).toContainText(
      "Login and/or password are wrong.",
    );
  });

  test("Assertions @myTag", async ({ page }) => {
    // Good for redirects
    // Checking you are on the right page
    await page.goto("https://www.example.com");
    await expect(page).toHaveURL("https://www.example.com");
    await expect(page).toHaveTitle("Example Domain");

    const element = page.locator("h1");
    await expect(element).toBeVisible();
    await expect(element).toHaveText("Example Domain");
    await expect(element).toHaveCount(1);

    const nonExistingElement = page.locator("h5");
    await expect(nonExistingElement).not.toBeVisible();
    await expect(page.locator("h5")).not.toBeVisible();
  });
});
