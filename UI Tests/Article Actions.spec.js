import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/builder/user.builder';
import { Navbar } from '../src/Page Object/navbar';
import { RegisterPage } from '../src/Page Object/registerPage';
import { HomePage } from '../src/Page Object/homePage';
import { NewArticlePage } from '../src/Page Object/newArticlePage';
import { ViewArticlePage } from '../src/Page Object/viewArticlePage';
import { ArcticleBuilder } from '../src/builder/arcticle.builder';
import { CommentBuilder } from '../src/builder/comment.builder';

const URL = 'https://realworld.qa.guru/';

test.describe('User Actions', () => {
  test.beforeEach(async ({page}) => {
    const navbar = new Navbar(page);
    const registerPage = new RegisterPage(page);
    const homePage = new HomePage(page);
    const userBuilder = new UserBuilder()
    .addEmail()
    .addUsername()
    .addPassword(6)
    .generator();

    await navbar.open(URL);
    await navbar.gotoRegister();
    await registerPage.registerUser(userBuilder.name, userBuilder.email, userBuilder.password);
    
    await expect(homePage.profileName).toBeVisible();
    await expect(homePage.profileName).toContainText(userBuilder.name);
    });
   
  test('Create Arcticle', async ({ page }) => {
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const arcticleBuilder = new ArcticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await homePage.gotoPublishArticle();
    await newArticlePage.publishArticle(arcticleBuilder.title, arcticleBuilder.about, arcticleBuilder.desciption, arcticleBuilder.tags);
    
    await expect(page.getByRole('heading')).toContainText(arcticleBuilder.title);
  });

  test('Post Comment', async ({ page }) => {
    const viewArticlePage = new ViewArticlePage(page);
    const newArticlePage = new NewArticlePage(page);
    const homePage = new HomePage(page);
    const commentBuilder = new CommentBuilder().addComment();
    const arcticleBuilder = new ArcticleBuilder()
      .addTitle()
      .addAbout()
      .addDescription()
      .addTags()
      .generator();

    await homePage.gotoPublishArticle();
    await newArticlePage.publishArticle(
      arcticleBuilder.title, 
      arcticleBuilder.about, 
      arcticleBuilder.desciption, 
      arcticleBuilder.tags);
    await homePage.gotoPublishArticle();
    await viewArticlePage.sendComment(commentBuilder.comment);
    
    await expect(page.getByRole('main')).toContainText(commentBuilder.comment);
  });

  test('Add to Favorite', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.gotoGlobalFeedTab();
    await homePage.addtoFavorite();

    await expect(page.getByRole('main')).toContainText('( 1 )');
  });
});