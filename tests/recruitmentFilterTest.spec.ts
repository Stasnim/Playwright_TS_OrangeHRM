import { test, expect, request } from '@playwright/test';
import { RecruitmentFilterpage } from '../pages/recruitmentPage/recruitmentFilter';
import { candidateData } from '../utils/candidateTestdata';
import{recruitmentFilterDatePickerData} from '../utils/datepickertestData';
//import {loginAPIutil} from '../utils/loginAPIutil';

test.describe('Recruitment Candidate page', () => {
  let reqruitmentFilterTest: RecruitmentFilterpage;

  test.beforeEach(async ({ page }) => {
    reqruitmentFilterTest = new RecruitmentFilterpage(page);

     await page.goto('https://opensource-demo.orangehrmlive.com');
     await page.locator('input[name="username"]').fill('Admin');
     await page.locator('input[name="password"]').fill('admin123');
     const login= await page.getByRole('button', { name: 'Login' })
     //await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
     await Promise.all([
      page.waitForURL('**/dashboard/**'),
      page.click('button')
    ])});
  

   // await reqruitmentFilterTest.navigaterecruit();
  

 

//const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};

 //let response;
/*
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new loginAPIutil(apiContext);
  
 
});*/
 

  test('OrangeHRM candidate vacancysingle Filter', async () => {
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

   test('OrangeHRM candidate Datepickersingle Filter', async () => {
    await reqruitmentFilterTest.navigaterecruit();

    await reqruitmentFilterTest.dateRange(
      recruitmentFilterDatePickerData.from,
      recruitmentFilterDatePickerData.to
    );

    await reqruitmentFilterTest.clicksearchbutton();
    await reqruitmentFilterTest.validateListResults();

});


});