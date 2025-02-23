export class BasePage {
    constructor(page) {
        this.page = page;
    }
    
    async open() {
        await this.page.goto(`/`);
    }
}