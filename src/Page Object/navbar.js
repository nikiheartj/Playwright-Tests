export class Navbar {
    constructor(page) {
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: ' Login' });
        this.username = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBB = page.getByRole('button', { name: 'Login' });
    }

    async gotoLogin() {
        this.loginButton.click();
    }

    async loginUser(email, password) {
        await this.username.click();
        await this.username.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.loginBB.click();
    }

    async gotoRegister() {
        await this.signUpButton.click();
    }

    async open(url) {
        await this.page.goto(url);    
    }
};