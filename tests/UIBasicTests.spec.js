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

test("Test Practice Website Login", async ({ page }) => {
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginbtn = page.locator('#login');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill('nandini.nig@email.com');
    await password.fill('RahulShetty@1234');

    console.log(await username.textContent()); //textContent() method will return the elements linked to the HTML DOM. Hence this method will return blanks
    console.log(await username.inputValue()); //inputValue() method will return the input value by user

    await loginbtn.click();
    console.log(await page.locator("[style *= 'text-transform']").nth(0).textContent());
})

test.only ('UI Controls', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('#password');
    const dropdown = page.locator("select.form-control");
    const radiobtn = page.locator("span.checkmark");
    const popup = page.locator("button#okayBtn");
    const blinkingtext = page.locator("[href *= 'documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    //invalid login - validate error message
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    //select dropdown
    await dropdown.selectOption("Teacher");
    //select radio button
    await radiobtn.nth(1).click();
    //click OKAY on popup
    await popup.click();
    //assertion to check if the checkbox is checked
    await expect((radiobtn).last()).toBeChecked();
    // debugging - opens playwright inspector window
    await page.pause();
    //assertion - check blinking text
    expect(blinkingtext).toHaveAttribute("class", "blinkingText");

});

test ('Handle Child Window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const blinkingtext = page.locator("[href *= 'documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    await expect(blinkingtext).toHaveAttribute('class', 'blinkingText');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingtext.click(),
    ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    
    //extract the domain name 'rahulshettyacademy.com' from text
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);

    
});
