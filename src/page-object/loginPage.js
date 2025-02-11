import { test } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async loginUser(email, password) {
        await test.step('Login to account', async () => {
            await this.username.click();
            await this.username.fill(email);
            await this.password.click();
            await this.password.fill(password);
            await this.loginButton.click();
        });
    }
}