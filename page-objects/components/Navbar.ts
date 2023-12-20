import { Locator, Page } from "@playwright/test";

export class Navbar {
  readonly page: Page;
  readonly accountSummaryTab: Locator;
  readonly accountActivityTab: Locator;
  readonly transferFundsTab: Locator;
  readonly payBillsTab: Locator;
  readonly myMoneyMapTab: Locator;
  readonly onlineStatementsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSummaryTab = page.locator("#account_summary_tab");
    this.accountActivityTab = page.locator("#account_activity_tab");
    this.transferFundsTab = page.locator("#transfer_funds_tab");
    this.payBillsTab = page.locator("#pay_bills_tab");
    this.myMoneyMapTab = page.locator("#money_map_tab");
    this.onlineStatementsTab = page.locator("#online_statements_tab");
  }

  async clickOnTab(tabName: string) {
    switch (tabName) {
      case "Account Summary":
        await this.accountSummaryTab.click();
        break;
      case "Account Activity":
        await this.accountActivityTab.click();
        break;
      case "Transfer funds":
        await this.transferFundsTab.click();
        break;
      case "Pay Bills":
        await this.payBillsTab.click();
        break;
      case "My Money Map":
        await this.myMoneyMapTab.click();
        break;
      case "Online Statements":
        await this.onlineStatementsTab.click();
        break;
      default:
        throw new Error("This tab doesn't exist");
    }
  }
}
