const { Builder } = require (`selenium-webdriver`);
const CartPage = require (`../webComponent/CartPage`);
const assert = require(`assert`);
const fs = require(`fs`);
require(`dotenv`).config();

const browser = process.env.BROWSER;

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

const screenshotDir = `./screenshots/`;
if(!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe(`TestCase 3 #Regression`, function() {
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

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g,`_`)}_${Date.now()}.png`
        fs.writeFileSync (filepath, screenshot, `base64`);
    });

    after(async function() {
        await driver.quit();
    });
});