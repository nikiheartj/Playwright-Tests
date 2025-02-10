import { test, expect } from '@playwright/test';
import { Navbar, RegisterPage } from '../src/page-object/index';
import { UserBuilder } from '../src/helpers/builder/index';

const URL = 'https://realworld.qa.guru/';

  test('Sign Up', async ({ page }) => {
    const navbar = new Navbar(page);
    const registerPage = new RegisterPage(page);
    const userBuilder = new UserBuilder()
      .addEmail()
      .addUsername()
      .addPassword(6)
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
    await test.step('User is registered', async () => {
      await expect(navbar.profileName).toContainText(userBuilder.name);
    });
  });