import { test } from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
    
        this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
        this.favoriteButton = page.getByRole('button', { name: ' ( 0 )' });
    }

    async getMyArt () {
        await this.globalFeedTab.click();
    }

    async gotoGlobalFeedTab () {
        await this.globalFeedTab.click();
    }

    async addtoFavorite() {
        await this.myArticle;
        await this.favoriteButton.click();
    }
}