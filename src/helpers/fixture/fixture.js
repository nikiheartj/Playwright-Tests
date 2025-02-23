import { test as base, expect } from '@playwright/test';
import { UserBuilder } from '../builder/index';
import { Navbar, RegisterPage, LoginPage } from '../page-object/index';

export const test = base.extend({   
    mainPage: async ({ page }, use) => {
        const navbar = new Navbar(page);

        await navbar.open();
        await use(page);
    },

    loginUser: async ({ page }, use) => {
        const USERDATA = {
            email: 'niki.heartj@gmail.com',
            password: 'niki.heartj@gmail.com',
            name: 'nikita'
        };
        const navbar = new Navbar(page);
        const loginPage = new LoginPage(page);

        await navbar.open();
        await navbar.gotoLoginPage();
        await loginPage.loginUser(USERDATA.email, USERDATA.password);
        await expect(navbar.profileName).toContainText(USERDATA.name);
        await use(page);
    },

    registerUser: async ({ page }, use) => {
        const navbar = new Navbar(page);
        const registerPage = new RegisterPage(page);
        const userBuilder = new UserBuilder()
            .addEmail()
            .addUsername()
            .addPassword(6)
            .generator();

        
        await navbar.open();
        await navbar.gotoSinUpPage();
        await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
        await expect(navbar.profileName).toContainText(userBuilder.name);
        await use(page);
    },
});