//import { test, expect } from '@playwright/test';
import { test} from '../fixtures/fixturelogin';
import {expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
import {loginData} from '../utils/loginTestdata';


test.describe('OrangeHRM login tests', () => {

test('Positive Login - valid credentials', async ({ page }) => {
    const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.valid.username, loginData.valid.password);
    await logintest.loginsuccessassertion();

  });

test('InvalidUsername & ValidPass', async({page}) => {
    const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.invalidUsername.username, loginData.valid.password)
    await logintest.loginfailerrormsg();
});

test('ValidUsername & InvalidPassword', async ({page}) => {
 const logintest= new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.valid.username, loginData.invalidPassword.password)
    await logintest.loginfailerrormsg();   

});

test('InValidUsername & InvalidPassword', async ({page}) => {
 const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.invalidBoth.username, loginData.invalidBoth.password)
    await logintest.loginfailerrormsg();   

});
 
test('EmptyUsername & EmptyPassword', async ({page}) => {
 const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.empty.username, loginData.empty.password)
    await logintest.loginReqmsg();   

});

test('EmptyUsername & ValidPassword', async ({page}) => {
 const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.empty.username, loginData.valid.password)
    await logintest.loginReqmsg();   

});

test('ValidUsername & EmptyPassword', async ({page}) => {
 const logintest = new LoginPage(page);
    await logintest.navigate();
    await logintest.logInfun(loginData.valid.username, loginData.empty.password)
    await logintest.loginReqmsg();   

});

});

/*import { test} from '../fixtures/fixturelogin';
import { loginData } from '../utils/loginTestdata';

test.describe('OrangeHRM login tests', () => {

  // Define all test cases in one array
  const testCases = [
    {
      name: 'Positive Login - valid credentials',
      username: loginData.valid.username,
      password: loginData.valid.password,
      expected: 'success',
    },
    {
      name: 'Negative Login - Invalid Username & Valid Password',
      username: loginData.invalidUsername.username,
      password: loginData.valid.password,
      expected: 'fail',
    },
    {
      name: 'Negative Login - Valid Username & Invalid Password',
      username: loginData.valid.username,
      password: loginData.invalidPassword.password,
      expected: 'fail',
    },
    {
      name: 'Negative Login - Empty Username & Empty Password',
      username: loginData.empty.username,
      password: loginData.empty.password,
      expected: 'required',
    },
    {
      name: 'Negative Login - Empty Username & Valid Password',
      username: loginData.empty.username,
      password: loginData.valid.password,
      expected: 'required',
    },
    {
      name: 'Negative Login - Valid Username & Empty Password',
      username: loginData.valid.username,
      password: loginData.empty.password,
      expected: 'required',
    },
  ];

  // Loop through all test cases
  for (const tc of testCases) {
    test(tc.name, async ({ loginfix }) => {
      await loginfix.logInfun(tc.username, tc.password);

      // Assertions based on expected outcome
      if (tc.expected === 'success') {
        await loginfix.loginsuccessassertion();
      } else if (tc.expected === 'fail') {
        await loginfix.loginfailerrormsg();
      } else if (tc.expected === 'required') {
        await loginfix.loginReqmsg();
      }
    });
  }

});*/
