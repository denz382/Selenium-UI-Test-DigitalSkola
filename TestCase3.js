const { Builder } = require (`selenium-webdriver`);
const CartPage = require (`./webComponent/CartPage`);
const assert = require(`assert`);
 

 

describe(`TestCase 3`, function() {
    this.timeout(40000);
    let driver;

    // Run setiap mulai test, satu kali saja paling awal
    before(async function() {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    //Test Suite di mulai dengan apa, setiap melakukan tes
    beforeEach(async function () {
        const cartPage = new CartPage(driver);
        await cartPage.navigate('https://www.saucedemo.com/inventory.html');
        await cartPage.addCart();
        
    });

    //Assertion atau validasi 
  
    it(`Add Item To Cart Succesfuly`, async function () {
        const cartPage = new CartPage(driver);
        const badgeText = await cartPage.isonDashboard();
        assert.strictEqual(badgeText, `1`, `Expected cart badge to show "1"`);
    });

    after(async function() {
        await driver.quit();
    });
});



    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g,`_`)}_${Date.now()}.png`
        fs.writeFileSync (filepath, screenshot, `base64`);
    });

    after(async function() {
        await driver.quit();
    });
