import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test as setup, expect } from '@playwright/test';
import { Navbar, LoginPage } from '../../src/page-object/index';
import { USERDATA } from './userData.js';
import path from 'path';

const userFile = 'playwright/.auth/userFile.json'; // Путь к файлу со стореджем, который записан в константу
const URL = 'https://realworld.qa.guru/';

setup('Login User', async ({ page }) => {
  await allure.owner("Nikita");
  await allure.severity(Severity.BLOCKER);

  const navbar = new Navbar(page);
  const loginPage = new LoginPage(page);

  await navbar.open(URL);
  await navbar.gotoLoginPage();
  await loginPage.loginUser(USERDATA.email, USERDATA.password);

  await setup.step('Expected Result: User is logged in', async () => {
    await expect(page.getByRole('navigation')).toContainText(USERDATA.name);
  });

  await page.context().storageState({ path: userFile }); // Записываем сторедж в файл
});