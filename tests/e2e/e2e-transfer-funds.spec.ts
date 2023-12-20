import { expect, test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Transfer funds and make payments", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");
  });

  test("Transfer funds", async ({ page }) => {
    await page.click("#transfer_funds_tab");
    await page.selectOption("#tf_fromAccountId", "2");
    await page.selectOption("#tf_toAccountId", "3");
    await page.fill("#tf_amount", "500");
    await page.fill("#tf_description", "test message");
    await page.click("#btn_submit");

    const boardHeader = page.locator("h2.board-header");
    expect(boardHeader).toContainText("Verify");
    await page.click("#btn_submit");

    const message = page.locator(".alert-success");
    expect(message).toContainText(
      "You successfully submitted your transaction.",
    );
  });
});
