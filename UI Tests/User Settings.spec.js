import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
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
  
      const userData = {
        username: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({length: 12}),
      };
      
      const newPassword = {
        password: faker.internet.password({length: 12}),
      };
  
      await navbar.open(URL);
      await navbar.gotoRegister();
      await registerPage.registerUser(userData.username, userData.email, userData.password);
      await homePage.gotoProfileSettings(userData.username);
      await settingsPage.updatePassword(newPassword.password); //* Updated password
      await settingsPage.logout(userData.username);
      await navbar.gotoLogin();
      await loginPage.loginUser(userData.email, newPassword.password);
  
      await expect(homePage.profileName).toBeVisible();
      await expect(homePage.profileName).toContainText(userData.username);
    });
  });