import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/builder/user.builder';
import { Navbar } from '../src/Page Object/navbar';
import { RegisterPage } from '../src/Page Object/registerPage';
import { HomePage } from '../src/Page Object/homePage';

const URL = 'https://realworld.qa.guru/';

  test('Sign Up', async ({ page }) => {
    const navbar = new Navbar(page);
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const userBuilder = new UserBuilder()
      .addEmail()
      .addUsername()
      .addPassword(6)
      .generator();

    await navbar.open(URL);
    await navbar.gotoRegister();
    await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
    
    await expect(homePage.profileName).toContainText(userBuilder.name);
  });