import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builder/user.builder';
import { Navbar } from '../src/page-object/navbar';
import { RegisterPage } from '../src/page-object/registerPage';

const URL = 'https://realworld.qa.guru/';

  test('Sign Up', async ({ page }) => {
    const navbar = new Navbar(page);
    const registerPage = new RegisterPage(page);
    const userBuilder = new UserBuilder()
      .addEmail()
      .addUsername()
      .addPassword(6)
      .generator();

    await navbar.open(URL);
    await navbar.gotoSinUpPage();
    await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
    
    await expect(navbar.profileName).toContainText(userBuilder.name);
  });