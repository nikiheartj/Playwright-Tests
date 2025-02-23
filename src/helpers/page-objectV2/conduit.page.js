import { RegisterPage, Navbar, BasePage } from "./index";

export class Conduit {
    constructor(page) {
        this.page = page;
        this.registerPage = new RegisterPage(page);
        this.navbar = new Navbar(page);
        // this.basePage = new BasePage(page);
    }
}