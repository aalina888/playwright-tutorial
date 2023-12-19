import { expect, test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Search results", () => {
  test("Should find search results", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.visit();
    await homePage.searchFor("bank");

    const numberOfLinks = page.locator("li > a");
    await expect(numberOfLinks).toHaveCount(2);
  });
});
