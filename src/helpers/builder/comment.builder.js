import { faker } from "@faker-js/faker";

export class CommentBuilder {
    addComment() {
        this.comment = faker.lorem.text();
        return this;
    }

    generator() {
        return {
            comment: this.comment,
        };
    }
};