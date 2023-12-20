import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly payeeSelector: Locator;
  readonly payeeDetailsButton: Locator;
  readonly payeeDetails: Locator;
  readonly accountSelector: Locator;
  readonly amountInput: Locator;
  readonly dateInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitPaymentButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeSelector = page.locator("#sp_payee");
    this.payeeDetailsButton = page.locator("#sp_get_payee_details");
    this.payeeDetails = page.locator("#sp_payee_details");
    this.accountSelector = page.locator("#sp_account");
    this.amountInput = page.locator("#sp_amount");
    this.dateInput = page.locator("#sp_date");
    this.descriptionInput = page.locator("#sp_description");
    this.submitPaymentButton = page.locator("#pay_saved_payees");
    this.message = page.locator("#alert_content > span");
  }

  async createPayment() {
    await this.payeeSelector.selectOption("apple");
    await this.payeeDetailsButton.click();
    await expect(this.payeeDetails).toBeVisible();
    await this.accountSelector.selectOption("6");
    await this.amountInput.fill("5000");
    await this.dateInput.fill("2021-11-09");
    await this.descriptionInput.fill("#sp_description");
    await this.submitPaymentButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText(
      "The payment was successfully submitted.",
    );
  }
}
