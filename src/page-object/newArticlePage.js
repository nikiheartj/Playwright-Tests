export class NewArticlePage {
    constructor(page) {
        this.page = page;

        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.aboutArticle = page.getByRole('textbox', { name: "What's this article about?" });
        this.descriptionArticle = page.getByRole('textbox', { name: "Write your article (in markdown)" });
        this.tags = page.getByRole('textbox', { name: "Enter tags" });

        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async publishArticle(title, about, description, tags) {
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.aboutArticle.click();
        await this.aboutArticle.fill(about);
        await this.descriptionArticle.click();
        await this.descriptionArticle.fill(description);
        await this.tags.click();
        await this.tags.fill(tags);
        await this.publishButton.click();
    }
}