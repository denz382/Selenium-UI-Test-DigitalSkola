const { By } = require (`selenium-webdriver`);

class CompletePage {
    constructor(driver){
        this.driver = driver;
        this.backhomeButton = By.id(`back-to-products`);
    }
    
    async navigate (browser){
        await this.driver.get(browser);
    }
    async isOnDashboard(){
        const title = await this.driver.findElement(By.className(`title`));
        return title.getText();
    }
        async backhome(){
            await this.driver.findElement(this.backhomeButton).click();
           
    }
}



module.exports = CompletePage;