import { faker } from "@faker-js/faker";

export class ArcticleBuilder {
    addTitle() {
        this.title = faker.lorem.sentence(5);
        return this;
    }

    addAbout() {
        this.about = faker.lorem.sentence({ min: 4, max: 8 });
        return this;
    }

    addDescription(symbol = 8) {
        this.description = faker.lorem.text();
        return this;
    }

    addTags() {
        this.tags = faker.lorem.words({ min: 1, max: 3 });
        return this;
    }

    generator() {
        return {
            title: this.title,
            about: this.about,
            desciption: this.description,
            tags: this.tags,
        };
    }
};