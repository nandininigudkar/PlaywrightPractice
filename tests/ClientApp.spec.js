const { test, expect } = require('@playwright/test');


test.only("Test Practice Website Login", async ({ page }) => {
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbtn = page.locator('#login');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill('nandini.nig@email.com');
    await password.fill('RahulShetty@1234');
    await loginbtn.click();
    
    // wait for all network calls to complete - 'networkidle is DISCOURAGED in playwright's latest versions
    // await page.waitForLoadState('networkidle');

    //waitFor() - another way for synchronization 
    const firstProduct = page.locator("[style *= 'text-transform']");
    await firstProduct.first().waitFor();
    const allTitles = await firstProduct.allTextContents();
    console.log(allTitles);
})

