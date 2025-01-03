const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstnameInput = By.id(`user-name`);
        this.lastnameInput = By.xpath(`//input[@id="password"]`);
        this.postalInput = By.xpath(`//input[@id="login-button"]`);
        this.continueButton = By.xpath(`//input[@id="login-button"]`);
        this.finishButton = By.id(`finish`);
        this.errorMessage = By.classname(`error-message-container error`);
    }
    async navigate (browser){
        await this.driver.get(browser);
    }
    async isOnDashboard() {
        const title = await this.driver.findElement(By.className(`title`));
        return title.getText();
        
      }

      async cekout(firstname, lastname, postal){
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalInput).sendKeys(postal);
        await this.driver.findElement(this.continueButton).click();
        await this.driver.findElement(this.finishButton).click();
    
        }

        async getErrorMessage() {
            try {
                const errorElement = await this.driver.findElement(this.errorMessage);
                return await errorElement.getText();
            } catch (err) {
                return null; 
            }
        }
    }

module.exports = CheckoutPage;
