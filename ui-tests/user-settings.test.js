import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test, expect } from '@playwright/test';
import { Navbar, RegisterPage, SettingsPage, LoginPage } from '../src/page-object/index';
import { UserBuilder } from '../src/helpers/builder/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Update User Settings', () => {
    test('Change Password', async ({ page }) => {
      await allure.owner("Nikita");
      await allure.severity(Severity.MAJOR);
      await allure.tags("Web interface", "Update Password");

      const navbar = new Navbar(page);
      const registerPage = new RegisterPage(page);
      const settingsPage = new SettingsPage(page);
      const loginPage = new LoginPage(page);
      const userBuilder = new UserBuilder()
        .addEmail()
        .addUsername()
        .addPassword(6)
        .generator();
      const newPassword = new UserBuilder()
        .addPassword(11)
        .generator();
        
      await navbar.open(URL);
      await navbar.gotoSinUpPage();
      await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
      await navbar.gotoProfileSettings(userBuilder.name);
      await settingsPage.updatePassword(newPassword.password);
      await navbar.logout(userBuilder.name);
      await navbar.gotoLoginPage();
      await loginPage.loginUser(userBuilder.email, newPassword.password);

      await test.step('Expected Result: User is logged in with a new password', async () => {
        await expect(navbar.profileName).toBeVisible();
        await expect(navbar.profileName).toContainText(userBuilder.name);
      });    
    });
  });