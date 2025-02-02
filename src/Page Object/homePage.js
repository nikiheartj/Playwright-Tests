export class HomePage {
    constructor(page) {
        this.page = page;
        
        this.profileName = page.getByRole('navigation');
        this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
        this.settingsLink = page.getByRole('link', { name: ' Settings' });
        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
        this.favoriteButton = page.getByRole('button', { name: ' ( 0 )' });
        this.article = page.getByRole('link', { name: 'Dedecor complectus vinculum' }); //! Нужен надежный якорь для этой кнопки

    }

    async gotoPublishArticle() {
        await this.newArticleButton.click();
    }

    async gotoProfileSettings (username){
      await this.profileName.getByText(username).click();
      await this.settingsLink.click();
    }

    async gotoGlobalFeedTab () {
        await this.globalFeedTab.click();
    }

    async addtoFavorite () {
        await this.favoriteButton.first().click();
    }
};