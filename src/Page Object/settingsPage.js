export class SettinsPage {
    constructor(page) {
        this.page = page;

        this.profileName = page.getByRole('navigation');
        this.logoutButton = page.getByRole('link', { name: ' Logout' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });

        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword(password) {
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateSettingsButton.click();
    }

    async logout(username) {
      await this.profileName.getByText(username).click();
      await this.logoutButton.click();
    }
};