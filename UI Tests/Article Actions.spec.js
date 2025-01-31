import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { Navbar } from '../src/Page Object/navbar';
import { RegisterPage } from '../src/Page Object/registerPage';
import { HomePage } from '../src/Page Object/homePage';
import { NewArticlePage } from '../src/Page Object/newArticlePage';
import { ViewArticlePage } from '../src/Page Object/viewArticlePage';

const URL = 'https://realworld.qa.guru/';

test.describe('User Actions', () => {
  test.beforeEach(async ({page}) => {
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
    
    await expect(homePage.profileName).toBeVisible();
    await expect(homePage.profileName).toContainText(userData.username);
    });
   
  test('Create Arcticle', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);

    const artData = {
      title: faker.lorem.sentence(5),
      about: faker.lorem.sentence({ min: 4, max: 8 }),
      desciption: faker.lorem.text(),
      tags: faker.lorem.words({ min: 1, max: 3 }),
    };

    await homePage.gotoPublishArticle();
    await newArticlePage.publishArticle(artData.title, artData.about, artData.desciption, artData.tags);
    
    await expect(page.getByRole('heading')).toContainText(artData.title);
    await expect(page.getByRole('main')).toContainText(artData.desciption);
  });

  test('Post Comment', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const homePage = new HomePage(page);

    const artData = {
      title: faker.lorem.sentence(5),
      about: faker.lorem.sentence({ min: 4, max: 8 }),
      desciption: faker.lorem.text(),
      tags: faker.lorem.words({ min: 1, max: 3 }),
    };
    const commentData = {
      text: faker.lorem.text(),
    };

    await homePage.gotoPublishArticle();
    await newArticlePage.publishArticle(artData.title, artData.about, artData.desciption, artData.tags);
    await homePage.gotoPublishArticle();
    await viewArticlePage.fillComment(commentData.text);
    
    await expect(page.getByRole('main')).toContainText(commentData.text);
  });

  test('Add to Favorite', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoGlobalArticlePage();
    await homePage.addtoFavorite();

    await expect(page.getByRole('main')).toContainText('( 1 )');
  });
});