import { test } from "@playwright/test";
import { getRandomNumber, getRandomString } from "../../utils/data-helpers";

test.describe("Tips and Tricks section", () => {
  test("TestInfo object", async ({ page }, testInfo) => {
    await page.goto("https://example.com");
    console.log(testInfo);
    console.log(testInfo.title);
    console.log(await getRandomNumber());
    console.log(await getRandomString());
  });

  test("Test skip browser", async ({ page, browserName }) => {
    test.skip(browserName === "chromium", "Feature not ready for chromium");
    await page.goto("https://example.com");
  });

  test("Test fixme annotation", async ({ page, browserName }) => {
    test.fixme(
      browserName === "chromium",
      "The test is not stable, needs revision",
    );
    await page.goto("https://example.com");
  });

  const people = ["Mike", "Judy", "Peter", "Elon", "ALice"];
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto("http://zero.webappsecurity.com/index.html");
      await page.fill("#searchTerm", name);
      await page.waitForTimeout(3000);
    });
  }

  test("Mouse movement simulation", async ({ page }) => {
    await page.goto("https://www.example.com");
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(0, 100);
    await page.mouse.up();
  });

  test("Multiple tabs inside 1 browser", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();

    await page1.goto("https://www.example.com");
    await page2.goto("https://www.example.com");
    await page3.goto("https://www.example.com");

    await page1.waitForTimeout(3000);
  });

  // Retries command
  // --retries=3

  // Run website on device
  // npx playwright open --device="iPhone 11" wikipedia.org

  // Generate pdf from the page
  // npx playwright pdf https://example.com my-file.pdf
  // Install plugin to see pdfs in the ide

  // Taking a screenshot
  // npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone.png

  // Timezone, language
  // npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
  // also geolocation with --geolocation and coordinates
});
