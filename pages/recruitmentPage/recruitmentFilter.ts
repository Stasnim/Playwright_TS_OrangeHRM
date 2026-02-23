import { Page, expect, Locator } from '@playwright/test';

export class RecruitmentFilterpage {
  page: Page;
  readonly candidatename: Locator;

  constructor(page: Page) {
    this.page = page;
    this.candidatename = page.locator('.oxd-autocomplete-dropdown').getByPlaceholder('Type for hints...');
  }

  /*async navigaterecruit() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates");
  }*/
async navigaterecruit() { 
  
  const reqmenu= this.page.locator('.oxd-main-menu-item').filter({hasText:'Recruitment'});
  await expect(reqmenu).toBeVisible();
  await reqmenu.click();
  await expect(this.page).toHaveURL(/recruitment/);
  //this.page.getByRole('link', { name: 'Recruitment' }).click();
  /*const candidatesLink= this.page.locator('.oxd-topbar-body-nav-tab').first(); 
  await candidatesLink.waitFor({ state: 'visible' });
  await candidatesLink.click();
  await this.page.waitForURL(/recruitment\/viewCandidates/);*/
}
 
 dropdownselectropdownbyLabel(label: string) {
  return this.page.locator('.oxd-input-group')
    .filter({ has: this.page.locator('.oxd-label', { hasText: label }) })
    .locator('.oxd-select-text');
 }

 selectdropdownOption(option: string) {
  return this.page.locator('.oxd-select-option').filter({ hasText: option });
}


 /*async selectJobTitle(jobTitle: string) {
    await this.dropdownselectropdownbyLabel('Job Title').click();
    const selectJobtitle=  this.selectdropdownOption(jobTitle);
    await selectJobtitle.waitFor({ state: 'visible' });
    await selectJobtitle.click();
  }*/
  async selectJobTitle(jobTitle: string) {
  const dropdown = this.dropdownselectropdownbyLabel('Job Title');
  await dropdown.click();

  const options = this.page.locator('.oxd-select-option');
  await options.first().waitFor({ state: 'visible' });


  // If "No Records Found" is shown, assert it and exit gracefully
  /*const noRecords = options.filter({ hasText: 'No Records Found' });
  if (await noRecords.count() > 0) {
    await expect(noRecords.first()).toBeVisible();
    console.log(`No job titles available, cannot select "${jobTitle}"`);
    return;
  }

  // Otherwise, select the requested job title
  const selectJobtitle = options.filter({ hasText: new RegExp(jobTitle, 'i') });
  await expect(selectJobtitle.first()).toBeVisible();
  await selectJobtitle.first().click();
*/
}




async selectVacancy(vacancy: string) {
    await this.dropdownselectropdownbyLabel('Vacancy').click();
    const dropdownselectVacancy =  this.selectdropdownOption(vacancy);
    await dropdownselectVacancy.waitFor({ state: 'visible' });
    await dropdownselectVacancy.click();
    
}

  async selectHiringManager(hiringManager: string) {
    await this.dropdownselectropdownbyLabel('Hiring Manager').click();
    const selecthiringManager = this.selectdropdownOption(hiringManager);
    await selecthiringManager.waitFor({ state: 'visible' });
    await selecthiringManager.click();
   
  }

  async selectStatus(status: string) {
    await this.dropdownselectropdownbyLabel('Status').click();
    const selectstatus =  this.selectdropdownOption(status);
    await selectstatus.waitFor({ state: 'visible' });
    await selectstatus.click();
  }

 async selectMethodofApplication(methodofApplication: string) {
    await this.dropdownselectropdownbyLabel('Method of Application').click();
    const selectmethodofApplication = this.selectdropdownOption(methodofApplication);
    await selectmethodofApplication.waitFor({ state: 'visible' });
    await selectmethodofApplication.click();
  } 

private inputboxhits(candidatenamehints: string): Locator{
    return this.page.getByRole('option', {name: candidatenamehints});
}
async typecandidate(candidatenamehints: string){
    await this.candidatename.fill(candidatenamehints);
    const typecandidates = this.inputboxhits(candidatenamehints);
    await typecandidates.waitFor({ state: 'visible' });
    await typecandidates.click();
    

}

async openDatePicker(index: number) {
  const input = this.page.locator('.oxd-date-input input').nth(index);
  await expect(input).toBeVisible;
  await input.click();

  const calendar = this.page.locator('.oxd-date-input-calendar').last();
  await expect(calendar).toBeVisible();
}


async selectMonth(monthName: string) {

  const openmonth= this.page.locator('.oxd-calendar-selector-month-selected').first();
  await expect(openmonth).toBeVisible();
  await openmonth.click();

  const monthOption = this.page.locator('.oxd-calendar-dropdown--option').filter({ hasText: monthName });
  await expect(monthOption).toBeVisible();
  await monthOption.click();
}


async selectYear(year: string) {
 
  const yearv=  this.page.locator('.oxd-calendar-selector-year-selected');
  await expect(yearv).toBeVisible();
  await yearv.click();

  const yearoption = this.page.locator('.oxd-calendar-dropdown--option').filter({ hasText: year.toString() });
  await expect(yearoption).toBeVisible();
  await yearoption.click();
}

/*const datepickerDate= await this.page.locator('.oxd-calendar-dates-grid .oxd-calendar-date').all();
for(let dpDate of datepickerDate){
  const dateText= await dpDate.innerText();
  if(dateText.trim()===date)
  {
    await dpDate.click();
    break;
  }*/

async selectDate(date:string) {
  const dateLocator = this.page.locator('.oxd-calendar-date').filter({ hasText: new RegExp(`^${date}$`) });
    
  await expect(dateLocator).toBeVisible();
  await dateLocator.first().click();
}


 //select month and year using next and prev button 
async ensureMonthYear(month: string, year: string) {
  const calendar = this.page.locator('.oxd-date-input-calendar');
  await calendar.waitFor({ state: 'visible', timeout: 5000 });

  const header = calendar.locator('.oxd-calendar-header');
  const nextBtn = calendar.locator('.oxd-calendar-next-button');
  const prevBtn = calendar.locator('.oxd-calendar-prev-button');

  for (let i = 0; i < 24; i++) {
    const headerText = (await header.textContent())?.trim() ?? '';
    // Example: "January 2024"

    if (headerText.includes(month) && headerText.includes(year)) {
      return;
    }

    const currentDate = new Date(headerText);
    const targetDate = new Date(`${month} 1, ${year}`);

    if (targetDate > currentDate) {
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
      } else {
        break;
      }
    } else {
      if (await prevBtn.isVisible()) {
        await prevBtn.click();
      } else {
        break;
      }
    }

    await expect(header).not.toHaveText(headerText);
  }

  throw new Error(`Month/year not reachable: ${month} ${year}`);
}


async dateRange(
  from: { date: string; month: string; year: string },
  to: { date: string; month: string; year: string }
) {
  // FROM
  await this.openDatePicker(0);
  await this.selectMonth(from.month);
  await this.selectYear(from.year);
  await this.selectDate(from.date);

  // TO
  await this.openDatePicker(1);
  await this.selectMonth(to.month);
  await this.selectYear(to.year);
  await this.selectDate(to.date);
}



  

/*async nextMonth() {
  await this.page.locator('.oxd-calendar-next-button').click();
}

async previousMonth() {
  const calendar = this.page.locator('.oxd-calendar').first();
  await calendar.locator('.oxd-calendar-prev-button').click();
}*/

async today() {
  await this.page.getByRole('button', { name: 'Today' }).click();
}

async clearDate() {
  await this.page.getByRole('button', { name: 'Clear' }).click();
}

async closeCalendar() {
  await this.page.getByRole('button', { name: 'Close' }).click();
}


async clicksearchbutton(){
    await this.page.getByRole('button', {name: 'Search'}).click();
}
async clickresetbutton(){
await this.page.getByRole('button',{name:'Reset'}).click();
}

async validateListResults() {

  const rows = this.page.locator('.oxd-table-body .oxd-table-row');
  const nextBtn = this.page.locator('button:has-text("Next")');
  const noRecordsText = this.page.getByText('No Records Found');

  // Wait until either rows appear OR no records message appears
  await Promise.race([
    rows.first().waitFor({ state: 'visible' }),
    noRecordsText.waitFor({ state: 'visible' })
  ]);

  // Case 1: No records
  if (await noRecordsText.isVisible()) {
    await expect(noRecordsText).toBeVisible();
    console.log('No records found for applied filters');
    return;
  }

  // Case 2: Records exist
  let previousPage = '';
  let totalRowCount = 0;

  while (true) {

    const currentPage = await rows.first().innerText();

    // Stop pagination when same data loads again
    if (currentPage === previousPage) {
      break;
    }

    previousPage = currentPage;

    const rowCount = await rows.count();
    totalRowCount += rowCount;

    console.log(' Rows found on page: ${rowCount}');

    // Stop if no Next button
    if (!(await nextBtn.isVisible())) {
      break;
    }
 
    await nextBtn.click();

    // Wait for table data to change
    await this.page.waitForFunction(
      (prevText) => {
        const row = document.querySelector('.oxd-table-body.oxd-table-row');
        return row && row.textContent !== prevText;
      },
      previousPage
    );
  }

  expect(totalRowCount).toBeGreaterThan(0);
  console.log('Total rows found after filtering: ${totalRowCount}');
}
}


  


/*async validateListResults() {
  const rows = this.page.locator('.oxd-table-body .oxd-table-row');
  const visibleRowCount= await rows.count();

if (visibleRowCount > 0){
  const nextBtn = this.page.locator('button:has-text("Next")');
  const noRecordsText = this.page.getByText('No Records Found');
  let previousPage = '';
  let foundMatch = false;

while (true) {
  const currentPage = await rows.first().innerText();

  if (currentPage === previousPage) {
    break;
  }
  previousPage = currentPage;
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
  const text = await rows.nth(i).innerText();
      if(text.includes(searchelement)){
        //expect(text).toBeTruthy();
        foundMatch = true;
        console.log(text);
      }
    }
       if (!(await nextBtn.isVisible())) {
        break;
      }

await nextBtn.click();

      // wait for data to change
      await this.page.waitForFunction(
        (prevText) => {
          const row = document.querySelector('.oxd-table-body .oxd-table-row');
          return row && row.textContent !== prevText;
        },
        previousPage
      );
    }
    expect(foundMatch).toBeTruthy();

  } else {
    console.log('Add data to show in list');
  }
}
}*/
