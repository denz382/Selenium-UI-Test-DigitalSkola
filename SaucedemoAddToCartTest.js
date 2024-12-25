const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

async function SaucedemoAddToCartTest() {
//Membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
await driver.get('https://www.saucedemo.com/');

//Masukkan Username dan Password
await driver.findElement(By.id('user-name')).sendKeys('standard_user');
await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('secret_sauce');

//Click Button Login
await driver.findElement(By.xpath('//input[@id="login-button"]')).click();

//Memastikan kita di dashboard dengan mencari judul "Swag Labs"
let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');

//Memastikan kita di dashboard dengan mencari "Burger Button"
let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
assert.strictEqual(await menuButton.isDisplayed(), true, 'Menu button is not visible');

//Click Button Add to Cart
await driver.findElement(By.xpath('//button[@id="add-to-cart-sauce-labs-bike-light"]')).click();

//Memastikan Item sudah Add to Cart
let cartBadge = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
assert.strictEqual(await cartBadge.isDisplayed(), true, 'Cart Badge is not visible');

//Click Cart Badge at Cart Button
await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']")).click();

//Memastikan kita di dashboard dengan mencari "Your Cart Label"
let yourcartLabel = await driver.findElement(By.xpath("//span[@class='title']"));
assert.strictEqual(await yourcartLabel.isDisplayed(), true, 'Your Cart Label is not visible');


//Memastikan kita di dashboard dengan mencari "Checkout Button"
let checkoutButton = await driver.findElement(By.xpath("//button[@id='checkout']"));
assert.strictEqual(await checkoutButton.isDisplayed(), true, 'Checkout Button is not visible');

//Memastikan kita di dashboard dengan mencari "Continue Shopping Button"
let contshoppingButton = await driver.findElement(By.xpath("//button[@id='continue-shopping']"));
assert.strictEqual(await contshoppingButton.isDisplayed(), true, 'Continue Shopping Button is not visible');



} finally {
await driver.quit();
}
}

SaucedemoAddToCartTest();