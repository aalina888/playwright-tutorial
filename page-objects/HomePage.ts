import { Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage {
  readonly signInButton: Locator;
  readonly searchInput: Locator;
  readonly linkFeedback: Locator;

  constructor(page: Page) {
    super(page);
    this.signInButton = page.locator("#signin_button");
    this.searchInput = page.locator("#searchTerm");
    this.linkFeedback = page.locator("#feedback");
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com/index.html");
  }

  async clickOnSignInButton() {
    await this.signInButton.click();
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click();
  }

  async searchFor(phrase: string) {
    await this.searchInput.fill(phrase);
    await this.page.keyboard.press("Enter");
  }
}
