const { Builder } = require (`selenium-webdriver`);
const LoginPage = require (`./webComponent/LoginPage`);
const DashboardPage = require (`./webComponent/DashboardPage`);
const CartPage = require (`./webComponent/CartPage`);
const assert = require(`assert`);
const fs = require(`fs`);

const screenshotDir = `./screenshots/`;
if(!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe(`TestCase 3`, function() {
    this.timeout(40000);
    let driver;

    // Run setiap mulai test, satu kali saja paling awal
    before(async function() {
        driver = await new Builder().forBrowser(`chrome`).build();
    });

    //Test Suite di mulai dengan apa, setiap melakukan tes
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        const cartPage = new CartPage(driver);
        await loginPage.navigate();
        await loginPage.login(`standard_user`, `secret_sauce`);
        
    });

    //Assertion atau validasi 
    it(`Login Successfuly and verify dashboard`, async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, `Products`, `Expected dashboard title to be Products`);
    });
   
    it(`Add Item To Cart Succesfuly`, async function () {
        const cartPage = new CartPage(driver);
        const title = await cartPage.isOnCart();
        assert.strictEqual(title, `Products`, `Description Item`);
    });



    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g,`_`)}_${Date.now()}.png`
        fs.writeFileSync (filepath, screenshot, `base64`);
    });

    after(async function() {
        await driver.quit();
    });
});