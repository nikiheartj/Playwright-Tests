import { faker } from "@faker-js/faker";

export class UserBuilder {
    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addUsername() {
        this.userName = faker.person.firstName();
        return this;
    }

    addPassword(symbol = 8) {
        this.userPassword = faker.internet.password({length: symbol});
        return this;
    }
/*
    addNewPassword(symbol = 10) {
        this.userNewPassword = faker.internet.password({length: symbol});
        return this;
    }
*/
    generator() {
        return {
            email: this.userEmail,
            name: this.userName,
            password: this.userPassword,
        };
    }
/*
    generatorNewPassword() {
        return {
            newPassword: this.userNewPassword,
        };
    }

    */
};