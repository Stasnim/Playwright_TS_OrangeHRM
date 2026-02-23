import { test, expect } from '@playwright/test';
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
    //await expect(page).toHaveURL(/dashboard/);
    
    
    await candidateAddTest.navigateadd()

    await candidateAddTest.addButton();
     
   });

    test('Add candidate with validdata', async({page}) => {
        //await candidateAddTest.addButton();
        //await candidateAddTest.navigateadd();
        await candidateAddTest.firstName(validCandidate.fname);
        await candidateAddTest.lastName(validCandidate.lname);
        await candidateAddTest.candEmail(validCandidate.candemail);
        await candidateAddTest.vacancy();
        await candidateAddTest.fileUpload();
        await candidateAddTest.savebutton(); 

    });

    test('Required check with empty fname',async({page}) =>{ 
      //await candidateAddTest.navigateadd();
     // await candidateAddTest.addButton();
      await candidateAddTest.lastName(validCandidate.lname);
      await candidateAddTest.candEmail(validCandidate.candemail);
      await candidateAddTest.vacancy();
      await candidateAddTest.fileUpload();
      await candidateAddTest.savebutton();
      await candidateAddTest.errormsgReq();
    });
    
    test('Required check with empty lname',async({page}) =>{ 
      //await candidateAddTest.navigateadd();
      //await candidateAddTest.addButton();
      await candidateAddTest.firstName(validCandidate.fname);
      await candidateAddTest.candEmail(validCandidate.candemail);
      await candidateAddTest.vacancy();
      await candidateAddTest.fileUpload();
      await candidateAddTest.savebutton();
      await candidateAddTest.errormsgReq();
    });
    
    test('Required check with emty email',async({page}) =>{
      //await candidateAddTest.navigateadd();
      //await candidateAddTest.addButton();
      await candidateAddTest.firstName(validCandidate.fname);
      await candidateAddTest.lastName(validCandidate.lname);
      await candidateAddTest.vacancy();
      await candidateAddTest.fileUpload();
      await candidateAddTest.savebutton();
      await candidateAddTest.errormsgReq();
     });

test('Negative - invalid Email formats', async () => {
    //await candidateAddTest.navigateadd();
    //await candidateAddTest.addButton();
    await candidateAddTest.firstName(validCandidate.fname);
    await candidateAddTest.lastName(validCandidate.lname);

    for (const email of invalidEmails) {
      await candidateAddTest.candEmail(email);
      await candidateAddTest.savebutton();
      await candidateAddTest.emailvalidationmsg();
    }
  });
});