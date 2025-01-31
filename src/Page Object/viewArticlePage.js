export class ViewArticlePage {
    constructor(page) {
        this.page = page;

        this.articleTitle = page.getByRole('heading');
        this.articleDescription = page.getByText('description');
        this.inputComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.favoriteButton = page.getByRole('button', { name: ' Favorite' }).nth(1);

        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    }

    async fillComment(text) {
        await this.inputComment.click();
        await this.inputComment.fill(text);
        await this.postCommentButton.click();
    }

    async addtoFavorite () {
        await this.favoriteButton.click();
    }
};