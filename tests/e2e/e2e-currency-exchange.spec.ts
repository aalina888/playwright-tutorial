import { test, expect } from "@playwright/test";

test.describe.only("Payment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button");
    await page.fill("#user_login", "username");
    await page.fill("#user_password", "password");
    await page.click("text=Sign in");
    await page.goto("http://zero.webappsecurity.com/bank/account-summary.html");
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
