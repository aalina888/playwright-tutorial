import { test } from "@playwright/test";
import { FeedbackPage } from "../../page-objects/FeedbackPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Feedback form", () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);

    await homePage.visit();
    await homePage.clickOnFeedbackLink();
  });

  // Reset feedback form
  test("Reset feedback form", async ({ page }) => {
    await feedbackPage.fillForm(
      "some name",
      "some_email@email.com",
      "some subject",
      "some comments about the application",
    );
    await feedbackPage.resetForm();
    await feedbackPage.assertReset();
  });

  // Submit feedback form
  test("Submit feedback form", async ({ page }) => {
    await feedbackPage.fillForm(
      "some name",
      "some_email@email.com",
      "some subject",
      "some comments about the application",
    );
    await feedbackPage.submitForm();
    await feedbackPage.feedbackFormSent();
  });
});
