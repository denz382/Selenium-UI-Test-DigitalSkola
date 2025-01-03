const { expect } = require(`selenium-webdriver`);
const CheckoutPage = require('../webComponent/CheckoutPage6');

describe("Checkout Page Tests", () => {
  let driver;
  let checkoutPage;

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
    checkoutPage = new CheckoutPage(driver);
  });

  it("should fill the checkout form and proceed", async () => {
    await driver.url("https://www.saucedemo.com/checkout-step-one.html");

    // Isi formulir checkout
    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterZipCode("12345");
    await checkoutPage.clickContinue();

    // Verifikasi halaman berikutnya
    const currentUrl = await driver.getUrl();
    expect(currentUrl).to.include("checkout-step-two.html");
  });

  after(async () => {
    // Tutup browser
    await driver.deleteSession();
  });
});
