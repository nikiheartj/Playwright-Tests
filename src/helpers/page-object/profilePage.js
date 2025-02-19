import { test } from "@playwright/test";

export class ProfilePage {
    constructor(page) {
        this.page = page;
    
        this.myFavoriteArticles = page.getByRole('link', { name: 'Favorited Articles' });
        this.favoriteButton = page.getByRole('button', { name: '( 0 )' }).first();
        // this.favoritedArticle = page.getByRole('main').first();
    }

    async gomyFavoriteArtTab() {
        await test.step('Go to my Favorite tab', async () => {
            await this.myFavoriteArticles.click();
        });
    }

    async addtoFavorite() {
        await test.step('Add to Favorite', async () => {
            await this.favoriteButton.click();
        });
    }
    
    favoritedArticle = (articleTitle) => this.page.locator('a', { hasText: articleTitle });
}