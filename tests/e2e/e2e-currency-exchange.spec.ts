import { expect, test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Payment", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");
  });

  test("Should make currency exchange", async ({ page }) => {
    await page.click("#pay_bills_tab");
    await page.click("text=Purchase Foreign Currency");
    await page.selectOption("#pc_currency", "EUR");
    await page.waitForSelector("#sp_sell_rate");
    await page.fill("#pc_amount", "500");
    await page.click("#pc_inDollars_true");
    await page.click("#pc_calculate_costs");
    await page.waitForSelector("#pc_conversion_amount");
    await page.click("#purchase_cash");

    const message = page.locator("#alert_content");
    await expect(message).toBeVisible();
    await expect(message).toContainText(
      "Foreign currency cash was successfully purchased.",
    );
  });
});
