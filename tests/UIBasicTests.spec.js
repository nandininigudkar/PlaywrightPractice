const { test, expect } = require('@playwright/test');


test('Browser Context Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
});

test('Web browser login validation', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator("[id='signInBtn']");
    const cardTiles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    //invalid login - validate error message
    await username.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //remove the incorrect credentials and add valid password
    await username.fill('');
    await username.fill('rahulshettyacademy');
    await password.fill('');
    await password.fill('Learning@830$3mK2');
    await signIn.click();

    //wordk with locators which extract multiple webelements
    console.log(await cardTiles.nth(0).textContent());
    console.log(await cardTiles.first().textContent());
    console.log(await cardTiles.nth(1).textContent());
    console.log(await cardTiles.last().textContent());

    //grab all the titles
    console.log(await cardTiles.allTextContents());

});

test.only("Test Practice Website Login", async ({ page }) => {
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbtn = page.locator('#login');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill('nandini.nig@email.com');
    await password.fill('RahulShetty@1234');
    await loginbtn.click();
    console.log(await page.locator("[style *= 'text-transform']").nth(0).textContent());
})

