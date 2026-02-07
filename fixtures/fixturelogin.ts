import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { loginData } from '../utils/loginTestdata';

export const test = base.extend < {loginfix: LoginPage;}>
({
  loginfix: async ({ page }, use) => {
    const loginfix = new LoginPage(page);
    await loginfix.navigate();
    //await loginfix.logInfun(loginData.valid.username, loginData.valid.password);

    //await loginfix.loginsuccessassertion();
    await use(loginfix);
  },
});
export { expect } from '@playwright/test';

/*import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';

export const test = base.extend<{
  loginfix: LoginPage;
}>({
  loginfix: async ({ page }, use) => {
    const loginfix = new LoginPage(page);
    await loginfix.navigate(); // navigate to login page
    await use(loginfix);
  },
});*/

