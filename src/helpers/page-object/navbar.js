import { test } from "@playwright/test";

export class Navbar {
    constructor(page) {
        this.page = page;
        
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.profileName = page.getByRole('navigation');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.homePageLink = page.getByRole('link', { name: 'Home' });
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.settingsLink = page.getByRole('link', { name: 'Settings' });
        this.profileLink = page.getByRole('link', { name: 'Profile' });
    }
    
    async open() {
        await test.step('Open link: https://realworld.qa.guru/', async () => {
            await this.page.goto('/');    
        });
    }
    
    async gotoHomePage() {
        await this.homePageLink.click();
    }
    
    async gotoLoginPage() {
        await test.step('Go to Login page', async () => {
            this.loginLink.click();
        });
    }
    
    async gotoProfilePage(username){
        await test.step('Go to Profile page', async () => {
            await this.profileName.getByText(username).click();
            await this.profileLink.click();
        });
    }

    async gotoProfileSettings(username){
        await test.step('Go to Profile Settings', async () => {
            await this.profileName.getByText(username).click();
            await this.settingsLink.click();
        });
    }
      
    async logout(username) {
        await test.step('Logout', async () => {
            await this.profileName.getByText(username).click();
            await this.logoutLink.click();
        });
    }   

    async gotoSinUpPage() {
        await test.step('Go to Sign Up page', async () => {
            await this.signUpLink.click();
        });
    }

    async gotoPublishArticlePage() {
        await test.step('Go to Create Article page', async () => {
            await this.newArticleLink.click();
        });
    }
}