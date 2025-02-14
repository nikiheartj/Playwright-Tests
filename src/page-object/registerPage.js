import { test } from "@playwright/test";

export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.email = page.getByRole('textbox', { name: 'Email' });
        this.username = page.getByRole('textbox', { name: 'Your Name' });
        this.password = page.getByRole('textbox', { name: 'Password' });

        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async registerUser(username, email, password) {
        await test.step('Register New User account', async () => {
            await this.email.click();
            await this.email.fill(email);
            await this.username.click();
            await this.username.fill(username);
            await this.password.click();
            await this.password.fill(password);
            await this.signUpButton.click();
        }
    )};
}