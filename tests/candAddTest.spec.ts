import { test } from '@playwright/test';
import { CandidateAdd } from '../pages/recruitmentPage/candidateAdd';
import { validCandidate, invalidEmails } from '../utils/candaddTestdata';



 test.describe('Candidate Add page', () => {

  let candidateAddTest: CandidateAdd;

  test.beforeEach(async ({ page }) => {
    candidateAddTest = new CandidateAdd(page);
 
     await page.goto('https://opensource-demo.orangehrmlive.com');
     await page.locator('input[name="username"]').fill('Admin');
     await page.locator('input[name="password"]').fill('admin123');
     await page.getByRole('button', { name: 'Login' }).click();
     await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
 
     
   });

    test('Add candidate with validdata', async({page}) => {
        await candidateAddTest.navigateadd();
        await candidateAddTest.addButton();
        await candidateAddTest.firstName(validCandidate.fname);
        await candidateAddTest.lastName(validCandidate.lname);
        await candidateAddTest.candEmail(validCandidate.candemail);
        await candidateAddTest.savebutton();

    });

    //test('Required check with emty lname',async({page}) =>{ });
    //test('Required check with emty lname',async({page}) =>{ });
    //test('Required check with emty email',async({page}) =>{ });

test('Negative - invalid Email formats', async () => {
    await candidateAddTest.navigateadd();
    await candidateAddTest.addButton();
    await candidateAddTest.firstName(validCandidate.fname);
    await candidateAddTest.lastName(validCandidate.lname);

    for (const email of invalidEmails) {
      await candidateAddTest.candEmail(email);
      await candidateAddTest.savebutton();
      await candidateAddTest.emailvalidationmsg();
    }
  });
});