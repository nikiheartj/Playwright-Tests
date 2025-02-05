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

    await navbar.open(URL);
    await navbar.gotoLoginPage();
    await loginPage.loginUser(USERDATA.email, USERDATA.password);
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

    await navbar.gotoPublishArticlePage();
    await newArticlePage.publishArticle(
      articleBuilder.title, 
      articleBuilder.about, 
      articleBuilder.description, 
      articleBuilder.tags);
    
    await expect(page.getByRole('heading')).toContainText(articleBuilder.title);
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
    
    await navbar.gotoPublishArticlePage();
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
    await page.waitForTimeout(1000); //* Тест отказывается переходить к следуещему шагу (строчке 104), если не сделать задержку. По всей видимости это из-за того что какое-то время публикуется статья и в этот момент нажатия на профайл ссылку в дропдауне профайл - не происходит. 
    await navbar.gotoProfilePage(USERDATA.name);
    await profilePage.addtoFavorite();
    await profilePage.gomyFavoriteArtTab(); 
      
    await expect(page.getByRole('main')).toContainText('( 1 )');
    await expect(page.getByRole('link', { name: articleBuilder.title })).toBeVisible();
  });
});