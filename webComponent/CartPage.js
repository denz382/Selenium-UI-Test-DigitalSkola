const { By } = require (`selenium-webdriver`);

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.addCartButton = By.xpath('//button[@id="add-to-cart-sauce-labs-bike-light"]');
        this.cartBadge = By.xpath("//span[@class='shopping_cart_badge']");
        
    }
    async navigate (browser){
        await this.driver.get(browser);
    }
async isonDashboard(){
    const badgeText = await this.driver.findElement(By.className(`title`));
    return badgeText.getText();
}

async addCart(){
    await this.driver.findElement(this.addCartButton).click();
    await this.driver.findElement(this.cartBadge).click();
}

}

module.exports = CartPage;