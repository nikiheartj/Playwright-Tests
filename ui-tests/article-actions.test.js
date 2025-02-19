import * as allure from 'allure-js-commons';
import { Severity } from "allure-js-commons";

import { test, expect } from '@playwright/test';
import { Navbar, NewArticlePage, ViewArticlePage, ProfilePage } from '../src/page-object/index';
import { ArticleBuilder, CommentBuilder } from '../src/helpers/builder/index';
import { USERDATA } from '../ui-tests/setup/userData.js';

const URL = 'https://realworld.qa.guru/';

test.describe('User Actions', () => {
  test('Create Article', async ({ page }) => {
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

    await navbar.open(URL);
    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);

    await test.step('Expected Result: Article is published', async () => {
      // await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
      await expect(viewArticlePage.articleTitle).toContainText(articleBuilder.title);
    });   
  });
  
  test('Post Comment', async ({ page }) => {
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

      
    await navbar.open(URL);
    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
    await viewArticlePage.sendComment(commentBuilder.comment);

    await test.step('Expected Result: Commet is sent under article', async () => {
      // await expect(page.getByRole('main')).toContainText(commentBuilder.comment);
    });
  });

  test('Add to Favorite', async ({ page }) => {
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
      
    await navbar.open(URL);
    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);
    await test.step('In between step: needs to redirect to the next step', async () => {
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