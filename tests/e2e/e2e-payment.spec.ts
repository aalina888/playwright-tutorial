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

  test("Should send new payment", async ({ page }) => {
    await page.click("#pay_bills_tab");
    await page.selectOption("#sp_payee", "apple");
    await page.click("#sp_get_payee_details");
    await page.waitForSelector("#sp_payee_details");
    await page.selectOption("#sp_account", "6");
    await page.fill("#sp_amount", "5000");
    await page.fill("#sp_date", "2021-11-09");
    await page.fill("#sp_description", "some description");
    await page.click("#pay_saved_payees");

    const message = page.locator("#alert_content > span");
    await expect(message).toBeVisible();
    await expect(message).toContainText(
      "The payment was successfully submitted.",
    );
  });
});
