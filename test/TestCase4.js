const { Builder} = require (`selenium-webdriver`);
const LoginPage = require (`../webComponent/LoginPage`);
const DashboardPage = require (`../webComponent/DashboardPage`);
const CartPage = require (`../webComponent/CartPage`);
const CheckoutPage = require (`../webComponent/CheckoutPage`);
const CompletePage = require (`../webComponent/CompletePage`);
const assert = require(`assert`);
const fs = require(`fs`);
require(`dotenv`).config();


const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = `./screenshots/`;
if(!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('Saucedemo Test Suite #Regression', function () {
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

    before(async function () {
        // Initialize the browser driver
    driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });
   
    beforeEach(async function () {
        // Navigate to the base URL before each test
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
        const cartPage = new CartPage(driver);
        await cartPage.navigate('https://www.saucedemo.com/cart.html');
        await cartPage.addCart();
        const checkoutPage = new CheckoutPage(driver);
        await checkoutPage.navigate('https://www.saucedemo.com/checkout-step-two.html');
        await checkoutPage.cekout(firstname, lastname, postal);
        const completePage = new CheckoutPage(driver);
        await completePage.navigate('https://www.saucedemo.com/checkout-complete.html');
        await completePage.backhome();

    });

        it(`Login Successfuly and verify dashboard`, async function () {
            const dashboardPage = new DashboardPage(driver);
            const title = await dashboardPage.isOnDashboard();
            assert.strictEqual(title, `Products`, `Expected dashboard title to be Products`);
        });

    it('Add Item to Cart Successfully', async function () {
        // Add Item to Cart
        const cartPage = new CartPage(driver);
        const badgeText = await cartPage.isDisplayed();
        assert.strictEqual(badgeText, `1`, `Expected cart badge to show "1"`);
        
    });

    it('Checkout Item Successfully', async function () {
        // Proceed to Checkout
        const checkoutPage = new CheckoutPage(driver); 
        const title = await checkoutPage.isOnDashboard();
        assert.strictEqual(title, `Check out your information`, `Expected dashboard title to be information`);
         
    });
        it(`Error message appears for empty information`, async function () {
        const checkoutPage = new CheckoutPage(driver);
        const errorMessage = await checkoutPage.getErrorMessage();
        assert.strictEqual(errorMessage, `Error: First Name is required`, `Expected error message does not match`);
    });

    it('Complete Payment Successfully', async function () {
        // Verify Thank You Page
        const completePage = new CompletePage(driver); 
        const title = await completePage.isOnDashboard();
        assert.strictEqual(title, 'THANK YOU FOR YOUR ORDER', 'Expected Thank You message after order completion');
    });

    afterEach(async function () {
        // Capture screenshot after each test
        const screenshot = await driver.takeScreenshot();
        const testName = this.currentTest.title.replace(/\s+/g, '_');
        require('fs').writeFileSync(`./screenshots/${testName}_${Date.now()}.png`, screenshot, 'base64');
    });

    after(async function () {
        // Quit the browser driver
        await driver.quit();
    });


})
