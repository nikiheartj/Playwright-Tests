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
 
    async open(url) {
        await this.page.goto(url);    
    }
    
    async gotoHomePage() {
        await this.homePageLink.click();
    }
    
    async gotoLoginPage() {
        this.loginLink.click();
    }
    
    async gotoProfilePage(username){
        await this.profileName.getByText(username).click();
        await this.profileLink.click();
    }

    async gotoProfileSettings(username){
        await this.profileName.getByText(username).click();
        await this.settingsLink.click();
    }
      
    async logout(username) {
        await this.profileName.getByText(username).click();
        await this.logoutLink.click();
    }   

    async gotoSinUpPage() {
        await this.signUpLink.click();
    }

    async gotoPublishArticlePage() {
        await this.newArticleLink.click();
    }
}