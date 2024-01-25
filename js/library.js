class Library {
    #games;
    #orders;
    #users;

    constructor() {
        this.#games = [];
        this.#orders = [];
        this.#users = [];
        this.initializeGames();
    }

    initializeGames() {
        // Пытаемся получить данные из localStorage, и если их нет, используем массив по умолчанию
        var gamesFromLocalStorage = (localStorage.getItem("Games") === null) ? [] : JSON.parse(localStorage.getItem("Games"));
        this.#games = (gamesFromLocalStorage.length === 0) ? [] : gamesFromLocalStorage;

        // Если в localStorage нет данных, используем массив по умолчанию gamesArray
        if (this.#games.length === 0) {
            this.#games = [
                new Game("img/witcher3.jpg", "The Witcher 3: Wild Hunt", "Action RPG", 8799, "An epic open-world fantasy role-playing game."),
                new Game("img/gta5.png", "Grand Theft Auto V", "Action-Adventure", 8100, "Explore the fictional state of San Andreas."),
                new Game("img/zelda.jpg", "The Legend of Zelda: Breath of the Wild", "Action-Adventure", 9199, "Embark on a journey in the kingdom of Hyrule."),
                new Game("img/overwatch.jpg", "Overwatch", "First-Person Shooter", 0, "Team-based multiplayer first-person shooter."),
                new Game("img/Minecraft.png", "Minecraft", "Sandbox", 5000, "Build and explore your own blocky world."),
                new Game("img/fortnite.jpg", "Fortnite", "Battle Royale", 6100, "Join the battle to be the last one standing."),
                new Game("img/rdr2.jpg", "Red Dead Redemption 2", "Action-Adventure", 19999, "Experience the American Wild West."),
                new Game("img/csgo.jpg", "Counter-Strike: Global Offensive", "First-Person Shooter", 5199, "Engage in intense multiplayer battles."),
                new Game("img/FIFA_22.jpg", "FIFA 22", "Sports", 6899, "Play the latest installment in the FIFA series."),
                new Game("img/among.jpg", "Among Us", "Party", 799, "Find the impostors among the crew in a space-themed setting.")
                // ... (остальные игры из gamesArray)
            ];
        }
    }

    addGame(game) {
        this.#games.push(game);
    }

    addUser(user) {
        this.#users.push(user);
    }

    getGames() {
        return this.#games;
    }

    getOrders() {
        return this.#orders;
    }

    getUsers() {
        return this.#users;
    }

    static requestCatalog(gameCode) {
        if (gameCode) {
            const game = this.getGames().find(game => game.getCode() === gameCode);
            return game ? game.getInfo() : "Game not found";
        } else {
            return this.getGames().map(game => game.getInfo());
        }
    }

    createOrder(user, paymentMethod) {
        let order = new Order(user, paymentMethod);
        this.#orders.push(order);
        return order;
    }
}

let libraryInstance = new Library();
