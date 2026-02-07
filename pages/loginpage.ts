import { test, expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly usernameinput: Locator;
    readonly passwordinput: Locator;
    readonly loginButton: Locator;
    errormsg: Locator;
    page: Page
 constructor(page: Page) {
    this.page = page;
    this.usernameinput = page.getByRole('textbox', { name: 'Username' });
    this.passwordinput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errormsg = page.locator('.oxd-alert-content-text');

}

async navigate(){
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
}

async logInfun(Username:string, Password:string ){
    await this.usernameinput.fill(Username);
    await this.passwordinput.fill(Password);
    await this.loginButton.click();
    
}

async loginsuccessassertion(){
    await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await expect(this.page.getByRole('heading', {name: "Dashboard"})).toBeVisible();
}

async loginfailerrormsg(){
    await expect(this.errormsg).toHaveText("Invalid credentials");

}


async loginReqmsg() {
    await expect(this.page.locator('.oxd-input-group__message').first())
        .toContainText("Required");
}

}
