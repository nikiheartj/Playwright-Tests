import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/builder/user.builder';
import { Navbar } from '../src/Page Object/navbar';
import { RegisterPage } from '../src/Page Object/registerPage';
import { HomePage } from '../src/Page Object/homePage';
import { SettinsPage } from '../src/Page Object/settingsPage';
import { LoginPage } from '../src/Page Object/loginPage';

const URL = 'https://realworld.qa.guru/';

test.describe('Update User Settings', () => {
    test('Change Password', async ({ page }) => {
      const navbar = new Navbar(page);
      const registerPage = new RegisterPage(page);
      const homePage = new HomePage(page);
      const settingsPage = new SettinsPage(page);
      const loginPage = new LoginPage(page);
      const userBuilder = new UserBuilder()
        .addEmail()
        .addUsername()
        .addPassword(6)
        .generator();
      const newPassword = new UserBuilder().addPassword(11).generator();

      await navbar.open(URL);
      await navbar.gotoRegister();
      await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
      await homePage.gotoProfileSettings(userBuilder.name);
      await settingsPage.updatePassword(newPassword.password); //* Updated password
      await settingsPage.logout(userBuilder.name);
      await navbar.gotoLogin();
      await loginPage.loginUser(userBuilder.email, newPassword.password);
  
      await expect(homePage.profileName).toBeVisible();
      await expect(homePage.profileName).toContainText(userBuilder.name);
    });
  });