import{test, expect,Page, Locator} from '@playwright/test';

export class CandidateList{
    readonly page:Page;

constructor(page:Page){
    this.page= page;
 
}

async navigatelist(){

    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates");
}

async view(name: string) {
  let found = false;

  while (true) {
    // Check current page
    await this.page.locator('.oxd-table-card').first().waitFor({ state: 'visible', timeout: 10000 });
    //const cleanName = name.replace(/\s+/g, ' ').trim();
//const row = this.page.locator('.oxd-table-card').filter({ hasText: new RegExp(cleanName, 'i') });
    const row = this.page.locator('.oxd-table-card').filter({hasText: new RegExp(name.replace(/\s+/g, '\\s*'), 'i')
});
    const count = await row.count();
    if (count === 1) { 
      await row.locator('i.oxd-icon.bi-eye-fill').click(); 
      found = true; 
      break; 
    }
    if (count > 1) 
      throw new Error(`Multiple candidates found with name ${name}`);

    // Next page logic
    const nextButton = this.page.locator('button.oxd-pagination-page-item--next');
    if (!(await nextButton.count()) || !(await nextButton.isVisible())) break; // no more pages
    await nextButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  if (!found) throw new Error(`Candidate ${name} was not found in recruitment table`);

  // Verify candidate view page
  const viewPage = this.page.locator('.oxd-form').first();
  await expect(viewPage).toBeVisible();
  await expect(viewPage).toContainText(name);
}


private tablerows():Locator{
    return this.page.locator('.oxd-table-card.oxd-table-row.oxd-table-row--with-border')
    .filter({ hasText: 'Jennifer  Clinton' });
}


async edit(newEmail:string){
    const row = this.tablerows();

  await expect(row).toHaveCount(1);

   await row.locator('i.oxd-icon.bi-pencil-fill').click();
    

    const viewpage= this.page.locator('orangehrm-card-container');
    await expect(viewpage).toContainText("Tanmay Anderson O'Keefe");
   const edit= await this.page.locator('.oxd-switch-wrapper').check();

    const emailInput = this.page.locator('input[placeholder="Type here"]')
      .nth(1); 

    await emailInput.fill(newEmail);

    await this.page
      .locator('button[type="submit"]')
      .filter({ hasText: 'Save' })
      .click();
}
async yesdelete(){
    const candidateName = 'coffee  classic';
    const row = this.page.locator('.oxd-table-card').filter({ hasText: candidateName });
    await expect(row).toHaveCount(1);
    await row.locator('.oxd-icon.bi-trash').click();
    const modal = this.page.locator('.orangehrm-dialog-popup');
    await expect(modal).toBeVisible();
    await modal.locator('.orangehrm-button-margin').filter({ hasText: 'Yes, Delete' }).click();
    await expect(row).toHaveCount(0);
}

async deletecancel(){
    const candidateName = 'coffee  classic';
    const row = this.page.locator('.oxd-table-card').filter({ hasText: candidateName });
    await expect(row).toHaveCount(1);
    await row.locator('.oxd-icon.bi-trash').click();
    const modal = this.page.locator('.orangehrm-dialog-popup');
    await expect(modal).toBeVisible();
    await modal.locator('.orangehrm-button-margin').filter({hasText:' No, Cancel '}).click();
    await expect(row).toHaveCount(1);
}

async deleteCrossButton(){
    const candidateName = 'coffee  classic';
    const row = this.page.locator('.oxd-table-card').filter({ hasText: candidateName });
    await expect(row).toHaveCount(1);
    await row.locator('.oxd-icon.bi-trash').click();
    const modal = this.page.locator('.orangehrm-dialog-popup');
    await expect(modal).toBeVisible();
    await modal.locator('.oxd-dialog-close-button').click();
    await expect(modal).not.toBeVisible();
    await expect(row).toHaveCount(0); 
}

async download(){

    const downloadevent= this.page.waitForEvent('download');
    const rowofDownload= this.page.locator('.oxd-table-card').filter({ hasText: 'John  Doe'});
    await expect(rowofDownload).toHaveCount(1);
    await rowofDownload.locator('oxd-icon-button.oxd-table-cell-action-space').filter({hasText:'John  Doe'}).click();
    const download = await downloadevent;
    /*const fileName = download.suggestedFilename();
  await download.saveAs('./downloads/${fileName}');*/
    (await downloadevent).saveAs("./"+ (await downloadevent).suggestedFilename());

}


}