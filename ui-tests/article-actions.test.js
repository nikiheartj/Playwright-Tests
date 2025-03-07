import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";


import { test } from '../src/helpers/fixture/index';
import { expect } from '@playwright/test';
import { Navbar, NewArticlePage, ViewArticlePage, ProfilePage } from '../src/helpers/page-object/index';
import { ArticleBuilder, CommentBuilder } from '../src/helpers/builder/index';

test.describe('User Actions', () => {
  const USERDATA = {
    email: 'niki.heartj@gmail.com',
    password: 'niki.heartj@gmail.com',
    name: 'nikita'
  };

  // test.beforeEach('Login', async ({ page }) => {
  //   const navbar = new Navbar(page);
  //   const loginPage = new LoginPage(page);

  //   await navbar.open();
  //   await navbar.gotoLoginPage();
  //   await loginPage.loginUser(USERDATA.email, USERDATA.password);
  // });

  test('Create Article', async ({ loginUser, page }) => { //* loginUser - это фикстура
    await allure.owner("Nikita");
    await allure.severity(Severity.CRITICAL);
    await allure.tags("Web interface", "Article Actions");

    const viewArticlePage = new ViewArticlePage(page);
    const newArticlePage = new NewArticlePage(page);
    const navbar = new Navbar(page);
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);

    await test.step('Expected Result: Article is published', async () => {
      await expect(viewArticlePage.articleTitle).toContainText(articleBuilder.title);
    });   
  });
  
  test('Post Comment', async ({ loginUser, page }) => { //* loginUser - это фикстура
    await allure.owner("Nikita");
    await allure.severity(Severity.MAJOR);
    await allure.tags("Web interface", "Article Actions");

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

    
    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
    await viewArticlePage.sendComment(commentBuilder.comment);

    await test.step('Expected Result: Commet is sent under article', async () => {
      await expect(viewArticlePage.comment).toContainText(commentBuilder.comment);
    });
  });

  test('Add to Favorite', async ({ loginUser, page }) => { //* loginUser - это фикстура
    await allure.owner("Nikita");
    await allure.severity(Severity.MAJOR);
    await allure.tags("Web interface", "Article Actions");

    const newArticlePage = new NewArticlePage(page);
    const navbar = new Navbar(page);
    const profilePage = new ProfilePage(page);
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);
    await test.step('This expected result needs to redirect to the next step', async () => {
      await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
    //await page.waitForLoadState("networkidle"); 
    });
    await navbar.gotoProfilePage(USERDATA.name);
    await profilePage.addtoFavorite();
    await profilePage.gomyFavoriteArtTab(); 

    await test.step('Expected Result: Article is added to favorite', async () => {
      await expect(profilePage.favoritedArticle(articleBuilder.title)).toContainText(articleBuilder.title);
    });
  });
});