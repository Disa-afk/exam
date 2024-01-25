class Game {
    #image;
    #title;
    #genre;
    #price;
    #description;

    constructor(image, title, genre, price, description) {
        this.#image = image;
        this.#title = title;
        this.#genre = genre;
        this.#price = price;
        this.#description = description;
    }

    getInfo() {
        return [this.#image, this.#title, this.#genre, this.#price, this.#description];
    }

    getImage() {
        return this.#image;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getPrice() {
        return this.#price;
    }

    static getGames() {
        return games;
    }
}
