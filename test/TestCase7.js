const { expect } = require("chai");
const CheckoutOverviewPage = require("../pages/checkoutOverviewPage");

describe("Checkout Overview Page Tests", () => {
  let driver;
  let checkoutOverviewPage;

  before(async () => {
    // Inisialisasi WebDriver
    const { remote } = require("webdriverio");
    driver = await remote({
      logLevel: "error",
      path: "/",
      capabilities: {
        browserName: "chrome",
      },
    });
    checkoutOverviewPage = new CheckoutOverviewPage(driver);
  });

  it("should display the correct item and price", async () => {
    await driver.url("https://www.saucedemo.com/checkout-step-two.html");

    // Verifikasi deskripsi dan harga produk
    const itemDescription = await checkoutOverviewPage.getItemDescription();
    const itemPrice = await checkoutOverviewPage.getItemPrice();

    expect(itemDescription).to.equal("Sauce Labs Bike Light");
    expect(itemPrice).to.equal("$9.99");
  });

  it("should complete the checkout process", async () => {
    // Klik tombol Finish
    await checkoutOverviewPage.clickFinish();

    // Verifikasi navigasi ke halaman berikutnya (Checkout Complete)
    const currentUrl = await driver.getUrl();
    expect(currentUrl).to.include("checkout-complete.html");
  });

  after(async () => {
    // Tutup browser
    await driver.deleteSession();
  });
});
