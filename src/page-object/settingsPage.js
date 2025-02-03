export class SettingsPage {
    constructor(page) {
        this.page = page;
        this.passwordField = page.getByRole('textbox', { name: 'Password' });

        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword(password) {
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateSettingsButton.click();
    }
};