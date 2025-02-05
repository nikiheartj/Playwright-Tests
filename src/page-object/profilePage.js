export class ProfilePage {
    constructor(page) {
        this.page = page;
    
        this.myFavoriteArticles = page.getByRole('link', { name: 'Favorited Articles' });
        this.favoriteButton = page.getByRole('button', { name: '( 0 )' }).first();
    }

    async gomyFavoriteArtTab() {
        await this.myFavoriteArticles.click();
    }

    async addtoFavorite() {
        // await this.myArticle.getByText(myArticle).click();
        await this.favoriteButton.click();
    }
}