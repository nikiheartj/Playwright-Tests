import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builder/index';
import { Conduit } from '../src/helpers/page-objectV2/conduit.page';

let newUser, conduit;

  test('Sign Up', async ({ page }) => {
    await allure.owner("Nikita");
    await allure.severity(Severity.BLOCKER);
    await allure.tags("Web interface", "Register User");
    
    conduit = new Conduit(page);
    newUser = new UserBuilder()
      .addEmail()
      .addUsername()
      .addPassword(6)
      .generator();

    await conduit.navbar.open();
    await conduit.navbar.gotoSinUpPage();
    await conduit.registerPage.registerUser(newUser.name, newUser.email, newUser.password);

    await test.step('Expected result: User is registered', async () => {
      await expect(conduit.navbar.profileName).toContainText(newUser.name);
    });
  });