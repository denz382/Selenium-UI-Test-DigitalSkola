const { expect } = require("chai");
const CheckoutCompletePage = require("../pages/checkoutCompletePage");

describe("Checkout Complete Page Tests", () => {
  let driver;
  let checkoutCompletePage;

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
    checkoutCompletePage = new CheckoutCompletePage(driver);
  });

  it("should display the correct confirmation message", async () => {
    await driver.url("https://www.saucedemo.com/checkout-complete.html");

    // Verifikasi header dan pesan konfirmasi
    const headerText = await checkoutCompletePage.getHeaderText();
    const messageText = await checkoutCompletePage.getMessageText();

    expect(headerText).to.equal("Thank you for your order!");
    expect(messageText).to.include(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  });

  it("should navigate back to the products page", async () => {
    // Klik tombol Back Home
    await checkoutCompletePage.clickBackHome();

    // Verifikasi navigasi kembali ke halaman produk
    const currentUrl = await driver.getUrl();
    expect(currentUrl).to.include("inventory.html");
  });

  after(async () => {
    // Tutup browser
    await driver.deleteSession();
  });
});
