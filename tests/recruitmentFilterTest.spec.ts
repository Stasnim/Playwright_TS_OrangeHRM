import { test, expect } from '@playwright/test';
import { RecruitmentFilterpage } from '../pages/recruitmentPage/recruitmentFilter';
import { candidateData } from '../utils/candidateTestdata';
import{recruitmentFilterDatePickerData} from '../utils/datepickertestData'

test.describe('Recruitment Candidate page', () => {
  let reqruitmentFilterTest: RecruitmentFilterpage;

  test.beforeEach(async ({ page }) => {
    reqruitmentFilterTest = new RecruitmentFilterpage(page);

    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });

    //await reqruitmentFilterTest.navigaterecruit();
  });

  /*test('OrangeHRM Filter page navigate', async () => { 
    await reqruitmentFilterTest.navigaterecruit();
  });*/

  test('OrangeHRM candidate single Filter', async () => {
    await reqruitmentFilterTest.navigaterecruit();
    await reqruitmentFilterTest.selectVacancy(candidateData.vacancy);
    await reqruitmentFilterTest.clicksearchbutton();
    await reqruitmentFilterTest.validateListResults();
    
  });

  /*test('OrangeHRM Candidate multiple Filters', async () => {
    await reqruitmentFilterTest.navigaterecruit();
    await reqruitmentFilterTest.selectJobTitle(candidateData.jobTitle);
    await reqruitmentFilterTest.selectStatus(candidateData.status);
    await reqruitmentFilterTest.selectVacancy(candidateData.vacancy);
    //await reqruitmentFilterTest.typecandidate(candidateData.candidatenamehints);
    await reqruitmentFilterTest.clicksearchbutton();
    await reqruitmentFilterTest.validateListResults();

  
  });*/

   test('OrangeHRM candidate Datepicker Filter', async () => {
    await reqruitmentFilterTest.navigaterecruit();

    await reqruitmentFilterTest.dateRange(
      recruitmentFilterDatePickerData.from,
      recruitmentFilterDatePickerData.to
    );

    await reqruitmentFilterTest.clicksearchbutton();
    await reqruitmentFilterTest.validateListResults();

});


});