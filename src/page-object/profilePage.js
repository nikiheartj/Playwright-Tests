export class ProfilePage {
    constructor(page) {
        this.page = page;
    
        this.myFavoriteArticles = page.getByRole('button', { name: 'Favorited Articles' });
        this.favoriteButton = page.getByRole('button', { name: ' ( 0 )' });
    }

    async gomyFavoriteArtTab() {
        await this.myFavoriteArticles.click();
    }

    async addtoFavorite(titleArt) {
        await this.favoriteButton.getByText(titleArt).click();
    }
};