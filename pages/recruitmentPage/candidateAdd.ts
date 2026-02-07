import{test, expect,Page, Locator} from '@playwright/test';

export class CandidateAdd{
    readonly page:Page;

constructor(page:Page){
    this.page= page;
 
}

async navigateadd(){

    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates");
}
async addButton(){
 const addcand=  this.page.locator('.oxd-button').filter({hasText: 'Add'}).click();;
 await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate');
}

 async firstName(fname:string){
 await this.page.getByPlaceholder('First Name').fill('fname');
 }
 
 async middleName(midname:string){
await this.page.getByPlaceholder('Middle Name').fill('midname');
 }

async lastName(lname:string){
await this.page.getByPlaceholder('Last Name').fill('lname');
}

async vacancy(){
await this.page.locator('.oxd-select-text').click();
 const ddVacancy= this.page.locator('.oxd-select-dropdown');
 await expect(ddVacancy).toBeVisible();
 await this.page.getByRole('option', { name: 'Senior QA Lead' }).click();
}

async candEmail(candemail:string){
    await this. page.getByLabel('Email').fill('candemail');
}

async fileupload(){
    //const fileChooserPromise = this. page.waitForEvent('filechooser');
   // const resume = await this.page.locator('.oxd-file-div')
   const [uploadFiles] = await Promise.all([
    this.page.waitForEvent('filechooser'),
    this.page.locator('.oxd-file-div').click()
   ])

   const multifile= uploadFiles.isMultiple();
   console.log(multifile);
   uploadFiles.setFiles(["uploaditems/resume.pdf"]);
   //uploadFiles.setInputFiles('Playwright-ts-waits.txt');
}

async cancelbutton(){
await this.page.locator('.oxd-button--ghost').click();
}

async savebutton(){
await this.page.getByRole('button', {name:'Save'}).click();
}

async errormsgReq(){
  const rermsg= this.page.locator('.oxd-input-field-error-message');
  await expect(rermsg).toContainText("Required");
}

async emailvalidationmsg(){
    const emailvalmsg=  this.page.locator('.oxd-input-group__message');
    await expect(emailvalmsg).toContainText("Expected format: admin@example.com");

}

 }
 








