const { Builder, By, Key, until } = require(`selenium-webdriver`);

    (async function exampleTest() {
//Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser(`chrome`).build();

//Exception handling & Conslusion
    try {
       
//Buka URL di Browser
    await driver.get(`https://www.google.com`);

//Mencari di search Box
    let searchbox = await driver.findElement(By.name(`q`));
        
//Simulate user behavior typing "Hello World"      
    await searchbox.sendKeys(`Hello World!`, Key.RETURN);
    await driver.wait(until.elementLocated(By.id(`result-stats`)), 10000);

    let title = await driver.getTitle();
    console.log(`Page title is: ${title}`)
        
    } finally {
         //Tutup Browser
        await driver.quit();
       

    }
})();