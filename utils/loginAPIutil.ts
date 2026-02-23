import { Locator } from "@playwright/test";

/*export class loginAPIutil {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
 
    async getToken() {
        const loginResponse = await this.apiContext.post("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
}*/
/*export class LoginAPIUtil {
    readonly apiContext;
    constructor(apiContext) {
        this.apiContext = apiContext;
       // this.loginPayload = loginPayload;
    }

    async loginAndGetCookies() {
        const loginResponse = await this.apiContext.post(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            {
                //data: this.loginPayload,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (loginResponse.status() !== 200) {
            throw new Error("Login failed");
        }

        // ✅ Get storage state (cookies + localStorage)
        const storageState = await this.apiContext.storageState();

        return storageState;
    }
}*/
