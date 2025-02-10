import { test, expect } from '@playwright/test';
import { Navbar, NewArticlePage, ViewArticlePage, ProfilePage, LoginPage } from '../src/page-object/index';
import { ArticleBuilder, CommentBuilder } from '../src/helpers/builder/index';

const URL = 'https://realworld.qa.guru/';

test.describe('User Actions', () => {
  const USERDATA = {
    email: 'niki.heartj@gmail.com',
    password: 'niki.heartj@gmail.com',
    name: 'nikita',
  };

  test.beforeEach('Login', async ({ page }) => {
    const navbar = new Navbar(page);
    const loginPage = new LoginPage(page);

    await test.step('Open link: https://realworld.qa.guru/', async () => {
      await navbar.open(URL);
    });
    await test.step('Go to Login page', async () => {
      await navbar.gotoLoginPage();
    });  
    await test.step('Login to account', async () => {
      await loginPage.loginUser(USERDATA.email, USERDATA.password);
    });      
  });

  test('Create Article', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const navbar = new Navbar(page);
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await test.step('Go to New Article page', async () => {
      await navbar.gotoPublishArticlePage();
    });
    await test.step('Publish article', async () => {
      await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
    });      
    await test.step('Article is published', async () => {
      await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
    });   
  });
  
  test('Post Comment', async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);
    const navbar = new Navbar(page);
    const newArticlePage = new NewArticlePage(page);
    const commentBuilder = new CommentBuilder().addComment().generator();
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await test.step('Go to New Article page', async () => {
      await navbar.gotoPublishArticlePage();
    });
    await test.step('Publish article', async () => {
      await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
    });
    await test.step('Send comment under article', async () => {
      await viewArticlePage.sendComment(commentBuilder.comment);
    });     
    await test.step('Commnet is sent under article', async () => {
      await expect(page.getByRole('main')).toContainText(commentBuilder.comment);
    });
  });
  test('Add to Favorite', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const navbar = new Navbar(page);
    const profilePage = new ProfilePage(page);
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await test.step('Go to New Article page', async () => {
      await navbar.gotoPublishArticlePage();
    });
    await test.step('Publish article', async () => {
      await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
    });
    await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
    //await page.waitForLoadState("networkidle");
    await test.step('Go to Profile page', async () => {
      await navbar.gotoProfilePage(USERDATA.name);
    });
    await test.step('Add to Favorite an article', async () => {
      await profilePage.addtoFavorite();
    });
    await test.step('Go to my Favorite tab', async () => {
      await profilePage.gomyFavoriteArtTab(); 
    });

    await test.step('Article is added to favorite', async () => {
      await expect(page.getByText(articleBuilder.title)).toBeVisible();
    });
  });
});