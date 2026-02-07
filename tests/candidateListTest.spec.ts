import { test, expect } from '@playwright/test';
import { Candidatelist } from '../pages/recruitmentPage/candidatelist'

test.describe('Recruitment Candidate list', () => {
  let candidatelistTest: Candidatelist;

  test.beforeEach(async ({ page }) => {
    // Instantiate POM
    candidatelistTest = new Candidatelist(page);

    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });

    // Navigate to Candidate List page
    await candidatelistTest.navigatelist();
  });

  test('View candidate details', async ({ page }) => {
    await candidatelistTest.view();
  });

  test('Edit candidate email', async ({ page }) => {
    await candidatelistTest.edit('newemail@test.com');
  });

  test('Delete candidate using Yes, Delete', async ({ page }) => {
    await candidatelistTest.yesdelete();
  });

  test('Delete candidate – Cancel button', async ({ page }) => {
    await candidatelistTest.deletecancel();
  });

  test('Delete candidate – Cross button', async ({ page }) => {
    await candidatelistTest.deleteCrossButton();
  });

  test('Download candidate file', async ({ page }) => {
    await candidatelistTest.download();
  });
});
