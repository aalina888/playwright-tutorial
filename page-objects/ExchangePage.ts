import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ExchangePage extends AbstractPage {
  readonly page: Page;
  readonly currencySelector: Locator;
  readonly sellRate: Locator;
  readonly amountInput: Locator;
  readonly inDollarsCheckbox: Locator;
  readonly calculateCostsButton: Locator;
  readonly conversionAmount: Locator;
  readonly purchaseButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    super(page);
    this.currencySelector = page.locator("#pc_currency");
    this.sellRate = page.locator("#sp_sell_rate");
    this.amountInput = page.locator("#pc_amount");
    this.inDollarsCheckbox = page.locator("#pc_inDollars_true");
    this.calculateCostsButton = page.locator("#pc_calculate_costs");
    this.conversionAmount = page.locator("#pc_conversion_amount");
    this.purchaseButton = page.locator("#purchase_cash");
    this.message = page.locator("#alert_content");
  }

  async purchase() {
    await this.currencySelector.selectOption("EUR");
    await expect(this.sellRate).toBeVisible();
    await this.amountInput.fill("500");
    await this.inDollarsCheckbox.click();
    await this.calculateCostsButton.click();
    await expect(this.conversionAmount).toBeVisible();
    await this.purchaseButton.click();
  }

  async asserSuccessfulPurchase() {
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText(
      "Foreign currency cash was successfully purchased.",
    );
  }
}
