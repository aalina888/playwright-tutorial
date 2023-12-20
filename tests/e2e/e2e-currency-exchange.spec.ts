import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { ExchangePage } from "../../page-objects/ExchangePage";
import { Navbar } from "../../page-objects/components/Navbar";

test.describe("Payment", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let exchangePage: ExchangePage;
  let navbar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    exchangePage = new ExchangePage(page);
    navbar = new Navbar(page);

    await homePage.visit();
    await homePage.clickOnSignInButton();
    await loginPage.login("username", "password");
  });

  test("Should make currency exchange", async ({ page }) => {
    await navbar.clickOnTab("Pay Bills");
    await page.click("text=Purchase Foreign Currency");

    await exchangePage.purchase();
    await exchangePage.asserSuccessfulPurchase();
  });
});
