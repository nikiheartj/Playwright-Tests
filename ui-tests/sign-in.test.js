import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test, expect } from '@playwright/test';
import { Navbar, LoginPage } from '../src/page-object/index';
import { USERDATA } from '../ui-tests/setup/userData.js';

test.use({ storageState: { cookies: [], origins: [] } }); //это сброс storage

const URL = 'https://realworld.qa.guru/';

test('Login User', async ({ page }) => {
  await allure.owner("Nikita");
  await allure.severity(Severity.BLOCKER);

  const navbar = new Navbar(page);
  const loginPage = new LoginPage(page);
  await navbar.open(URL);
  await navbar.gotoLoginPage();
  await loginPage.loginUser(USERDATA.email, USERDATA.password);

  await test.step('Expected Result: User is logged in', async () => {
    await expect(page.getByRole('navigation')).toContainText(USERDATA.name);
  });
});