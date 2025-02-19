import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test, expect } from '@playwright/test';
import { Navbar, LoginPage, RegisterPage } from '../src/helpers/page-object/index';
import { UserBuilder } from '../src/helpers/builder/index';

test.describe('Login', () => {
    const userBuilder = new UserBuilder()
      .addEmail()
      .addUsername()
      .addPassword(6)
      .generator();

    test.beforeEach('Register User', async ({ page }) => {
      const navbar = new Navbar(page);
      const registerPage = new RegisterPage(page);

      await navbar.open();
      await navbar.gotoSinUpPage();
      await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
      await navbar.logout(userBuilder.name);
    });

    test('Login User', async ({ page }) => {
      await allure.owner("Nikita");
      await allure.severity(Severity.BLOCKER);

      const navbar = new Navbar(page);
      const loginPage = new LoginPage(page);

      await navbar.gotoLoginPage();
      await loginPage.loginUser(userBuilder.email, userBuilder.password);

      await test.step('Expected Result: User is logged in', async () => {
        await expect(page.getByRole('navigation')).toContainText(userBuilder.name);
      });
    });
});