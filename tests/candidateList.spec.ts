import { test, expect } from '@playwright/test';
import { CandidateList } from '../pages/recruitmentPage/candidatelist';
import { listdata } from '../utils/listTest';

test.describe('Recruitment Candidate list', () => {
  let candidatelistTest: CandidateList;

  test.beforeEach(async ({ page }) => {
   
    candidatelistTest = new CandidateList(page);

    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });

    // Navigate to Candidate List page
    await candidatelistTest.navigatelist();
    /*await page.locator('.oxd-table-card').first().waitFor({ state: 'visible', timeout: 10000 });
    const allRows = await page.locator('.oxd-table-card').allTextContents();
    console.log("Rows in table:", allRows);*/
  });

  test('View candidate details', async ({ page }) => {

    await candidatelistTest.view(listdata.name);
  });

  /*test('Edit candidate email', async ({ page }) => {
    await candidatelistTest.edit('newemail@test.com');
  });

  /*test('Delete candidate using Yes, Delete', async ({ page }) => {
    await candidatelistTest.yesdelete();
  });

  test('Delete candidate Cancel button', async ({ page }) => {
    await candidatelistTest.deletecancel();
  });

  test('Delete candidate Cross button', async ({ page }) => {
    await candidatelistTest.deleteCrossButton();
  });

  test('Download candidate file', async ({ page }) => {
    await candidatelistTest.download();
  });*/
});
