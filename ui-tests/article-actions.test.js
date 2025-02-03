import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builder/user.builder';
import { Navbar } from '../src/page-object/navbar';
import { RegisterPage } from '../src/page-object/registerPage';
import { NewArticlePage } from '../src/page-object/newArticlePage';
import { ViewArticlePage } from '../src/page-object/viewArticlePage';
import { ArticleBuilder } from '../src/helpers/builder/article.builder';
import { CommentBuilder } from '../src/helpers/builder/comment.builder';
import { ProfilePage } from '../src/page-object/profilePage';
import { HomePage } from '../src/page-object/homePage';

const URL = 'https://realworld.qa.guru/';

test.describe('User Actions', () => {
  test.beforeEach(async ({page}) => {
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
    
    await expect(navbar.profileName).toBeVisible();
    await expect(navbar.profileName).toContainText(userBuilder.name);
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

    await navbar.gotoPublishArticle();
    await newArticlePage.publishArticle(articleBuilder.title, articleBuilder.about, articleBuilder.description, articleBuilder.tags);
    
    await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
  });

  test('Post Comment', async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);
    const commentBuilder = new CommentBuilder().addComment();
    const navbar = new Navbar(page);
    const newArticlePage = new NewArticlePage(page);
    const articleBuilder = new ArticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await navbar.gotoPublishArticle();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);
    await viewArticlePage.sendComment(commentBuilder.comment);
    await expect(page.getByRole('main')).toContainText(commentBuilder.comment);
  });

  test('Add to Favorite', async ({ page }) => {
      const newArticlePage = new NewArticlePage(page);
      const navbar = new Navbar(page);
      // const profilePage = new ProfilePage(page);
      const homePage = new HomePage(page);
      const articleBuilder = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addDescription()
        .addTags()
        .generator();

      await navbar.gotoPublishArticle();
      await newArticlePage.publishArticle(
        articleBuilder.title, 
        articleBuilder.about, 
        articleBuilder.description, 
        articleBuilder.tags);
      // await navbar.gotoProfilePage(userBuilder.name);
      // await profilePage.gomyFavoriteArtTab();
      // await profilePage.addtoFavorite(articleBuilder.title);
      await navbar.gotoHomePage();
      await homePage.gotoGlobalFeedTab();
      await page.locator(`//h1[text()= "${articleBuilder.title}"]/../../div[@class="article-meta"]//button`).click;

      await expect(page.getByRole('main')).toContainText('( 1 )');
  });
});