const { Builder } = require (`selenium-webdriver`);
const LoginPage = require (`../webComponent/LoginPage`);
const DashboardPage = require (`../webComponent/DashboardPage`);
const CheckoutPage = require ('../webComponent/CheckoutPage');
const assert = require(`assert`);
const fs = require(`fs`);
require(`dotenv`).config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

describe(`TestCase 1 [login] #Regression `, function() {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()) {
        case `firefox` :
            const firefox = require(`selenium-webdriver/firefox`);
            options = new firefox.Options();
            options.addArguments(`--headless`);

        case `edge` :
            const edge = require(`selenium-webdriver/edge`);
            options = new edge.Options();
           
        case `chrome` :
        default :
            const chrome = require(`selenium-webdriver/chrome`);
            options = new chrome.Options();
            options.addArguments(`--headless`);
            break;
    }

 // Run setiap mulai test, satu kali saja paling awal
 before(async function() {
    driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
});

//Test Suite di mulai dengan apa, setiap melakukan tes
beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);

});

//Assertion atau validasi
it(`Login Successfuly and verify dashboard`, async function () {
    const dashboardPage = new DashboardPage(driver);
    const title = await dashboardPage.isOnDashboard();
    assert.strictEqual(title, `Products`, `Expected dashboard title to be Products`);
});

(async function testCheckoutPage() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Akses halaman checkout
    await driver.get('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Tunggu elemen tersedia
    await driver.wait(until.elementLocated(By.xpath("//input[@id='first-name']")), 20000);

    // 3. Inisialisasi Page Object
    const checkoutPage = new CheckoutPage(driver);

    // 4. Isi formulir checkout
    const firstName = 'John';
    const lastName = 'Doe';
    const zipCode = '12345';

    await checkoutPage.fillCheckoutForm(firstName, lastName, zipCode);

    // 5. Klik tombol "Continue"
    await checkoutPage.clickContinue();

    // 6. Verifikasi navigasi ke langkah berikutnya
    const headerText = await checkoutPage.getHeaderText();
    assert.strictEqual(headerText, 'Checkout: Overview', 'Expected to navigate to Checkout Overview');
    console.log('Test passed: Navigated to Checkout Overview.');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    // 7. Tutup browser
    await driver.quit();
  }
})();
})