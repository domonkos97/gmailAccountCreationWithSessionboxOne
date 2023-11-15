import { ColorNames } from '@sessionbox/toolkit';
import { sessionBoxInit } from '@sessionbox/toolkit';
import { By, until } from 'selenium-webdriver';
require('dotenv').config();


async function initializeSessionBox() {
    const apiKey = 'process.env.API_KEY';
    if (!apiKey) {
        throw new Error('API_KEY is not defined.');
    }
    const { api, selenium } = await sessionBoxInit(apiKey);
    return { api, selenium };
}

async function createGmailAccount(selenium: any, name: string, yearOfBirth: string, month: string, day: string, email: string, pass: string) {
    let driver;
    try {
        driver = await selenium.openNewProfile('temp', 'https://accounts.google.com/signup/v2/createaccount');
        
        // 1. Provide name
        const nameField = await driver.wait(
            until.elementLocated(By.name('firstName')),
            5000 
        );      
        nameField.click();
        nameField.sendKeys(name);

        const nextButton = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="collectNameNext"]/div/button')),
            5000 
        );
        nextButton.click();

        // 2. Provide birth date
        const yearField = await driver.wait(
            until.elementLocated(By.name('year')),
            5000 
        );   
        yearField.click();
        yearField.sendKeys(yearOfBirth);

        const dayField = await driver.wait(
            until.elementLocated(By.name('day')),
            5000 
        );      
        dayField.click();
        dayField.sendKeys(day);

        const monthField = await driver.wait(
            until.elementLocated(By.id('month')),
            5000 
        );   
        monthField.click();

        const monthIdentifier = '//*[@id="month"]/option[' + month + ']'
        const monthOption = await driver.wait(
            until.elementLocated(By.xpath(monthIdentifier)),
            5000 
        ); 
        monthOption.click();


        // 3. Provide gender
        const gender = await driver.wait(
            until.elementLocated(By.id('gender')),
            5000 
        ); 
        gender.click();

        const genderOption = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="gender"]/option[4]')),
            5000 
        ); 
        genderOption.click();

        const nextButton2 = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="birthdaygenderNext"]/div/button')),
            5000 
        );
        nextButton2.click()

        // 4. Provide email addrees
        const emailAddress = await driver.wait(
            until.elementLocated(By.id('selectionc2')),
            5000 
        );
        emailAddress.click();

        const emailAdressInput = await driver.wait(
            until.elementLocated(By.name('Username')),
            10000 
        );

        await new Promise(resolve => setTimeout(resolve, 5000));

        emailAdressInput.sendKeys(email)
        
        const nextButton3 = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="next"]/div/button')),
            5000 
        );
        nextButton3.click()

        // 5. PASSWORD
        const password = await driver.wait(
            until.elementLocated(By.name('Passwd')),
            10000 
        );

        await new Promise(resolve => setTimeout(resolve, 5000));

        password.sendKeys(pass)

        const password2 = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="confirm-passwd"]/div[1]/div/div[1]/input')),
            10000 
        );
        password2.click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        password2.sendKeys(pass)

        const nextButton4 = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="createpasswordNext"]/div/button')),
            5000 
        );
        nextButton4.click()

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (driver) {
            await new Promise(resolve => setTimeout(resolve, 100000));
            await driver.quit();
        }
    }
}

async function main() {
    const { api, selenium } = await initializeSessionBox();
    createGmailAccount(selenium, 'John', '1997', '03', '13', 'newEmail123987', 'strongPw298');
}
    
main();