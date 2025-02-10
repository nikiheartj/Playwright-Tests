import { test, expect } from '@playwright/test';
import { Navbar, RegisterPage, SettingsPage, LoginPage } from '../src/page-object/index';
import { UserBuilder } from '../src/helpers/builder/index';

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
      const newPassword = new UserBuilder()
        .addPassword(11)
        .generator();
      await test.step('Open link: https://realworld.qa.guru/', async () => {
        await navbar.open(URL);
      });
      await test.step('Go to Sign Up page', async () => {
        await navbar.gotoSinUpPage();
      });        
      await test.step('Register user account', async () => {
        await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
      });
      await test.step('Go to Profile Settings', async () => {
        await navbar.gotoProfileSettings(userBuilder.name);
      });
      await test.step('Update password', async () => {
        await settingsPage.updatePassword(newPassword.password);
      });
      await test.step('Logout', async () => {
        await navbar.logout(userBuilder.name);
      });  
      await test.step('Go to Login page', async () => {
        await navbar.gotoLoginPage();
      });  
      await test.step('Login to account', async () => {
        await loginPage.loginUser(userBuilder.email, newPassword.password);
      });  
      await test.step('User is logged in with new password', async () => {
        await expect(navbar.profileName).toBeVisible();
        await expect(navbar.profileName).toContainText(userBuilder.name);
      });    
    });
  });