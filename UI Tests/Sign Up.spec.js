import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Navbar } from '../src/Page Object/navbar';
import { RegisterPage } from '../src/Page Object/registerPage';
import { HomePage } from '../src/Page Object/homePage';

const URL = 'https://realworld.qa.guru/';

  test('Sign Up', async ({ page }) => {
    const navbar = new Navbar(page);
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);

    const userData = {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 12}),
    };
    await navbar.open(URL);
    await navbar.gotoRegister();
    await registerPage.registerUser(userData.username, userData.email, userData.password);
    
    await expect(homePage.profileName).toContainText(userData.username);
  });