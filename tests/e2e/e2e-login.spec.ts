import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe.parallel("Login / Logout flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  // Before hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
  });

  // Negative scenario
  test("Negative scenario for login", async ({ page }) => {
    await homePage.clickOnSignInButton();
    await loginPage.login("invalid username", "invalid password");
    await loginPage.assertErrorMessage();
  });

  // Positive scenario + logout
  test("Positive scenario for logging + logout", async ({ page }) => {
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");

    await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html");
    const accountSummaryTab = page.locator("#account_summary_tab");
    await expect(accountSummaryTab).toBeVisible();

    await page.goto("http://zero.webappsecurity.com/logout.html");
    await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html");
  });
});
