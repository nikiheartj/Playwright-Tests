import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builder/user.builder';
import { Navbar } from '../src/page-object/navbar';
import { RegisterPage } from '../src/page-object/registerPage';
import { SettingsPage } from '../src/page-object/settingsPage';
import { LoginPage } from '../src/page-object/loginPage';

const URL = 'https://realworld.qa.guru/';

test.describe('Update User Settings', () => {
    test('Change Password', async ({ page }) => {
      const navbar = new Navbar(page);
      const registerPage = new RegisterPage(page);
      const settingsPage = new SettingsPage(page);
      const loginPage = new LoginPage(page);
      const userBuilder = new UserBuilder()
        .addEmail()
        .addUsername()
        .addPassword(6)
        .generator();
      const newPassword = new UserBuilder().addPassword(11).generator();
      
      await navbar.open(URL);
      await navbar.gotoSinUpPage();
      await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
      await navbar.gotoProfileSettings(userBuilder.name);
      await settingsPage.updatePassword(newPassword.password);
      await navbar.logout(userBuilder.name);
      await navbar.gotoLoginPage();
      await loginPage.loginUser(userBuilder.email, newPassword.password);
  
      await expect(navbar.profileName).toBeVisible();
      await expect(navbar.profileName).toContainText(userBuilder.name);
    });
  });