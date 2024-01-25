class User {
    #name;
    #nickname;
    #email;
    #password;

    constructor(name, nickname, email, password) {
        this.#name = name;
        this.#nickname = nickname;
        this.#email = email;
        this.#password = password;
    }

    getInfo() {
        return [this.#name, this.#nickname, this.#email, this.#password];
    }

    static getUsers() {
        // Предположим, что у вас есть где-то определенный массив пользователей
        // Если нет, вы должны создать этот массив или получить его из другого источника
        var users = []; // Замените на ваш фактический массив пользователей

        return users;
    }

    static register(name, nickname, email, password, confirmPassword) {
        // Ваш код для регистрации пользователя
        // Проверка соответствия пароля и подтверждения пароля
        if (password !== confirmPassword) {
            console.log("Passwords do not match. Registration failed.");
            return false;
        }

        

        // Создание нового пользователя
        let newUser = new User(name, nickname, email, password);
        let users = libraryInstance.getUsers();
        if (users.some(user => user.getNickname() === nickname)) {
            return false;
        }
        else {
            // Добавление нового пользователя в хранилище пользователей
            libraryInstance.addUser(newUser);

            console.log("Registration successful. Welcome, " + nickname + "!");
            return true;
        }
    }

    static isNicknameTaken(nickname) {
        var users = libraryInstance.getUsers();
        return users.some(user => user.getNickname() === nickname);
    }

    static isEmailTaken(email) {
        let users = libraryInstance.getUsers();
        return users.some(user => user.getEmail() === email);
    }



    getNickname() {
        return this.#nickname;
    }

    getEmail() {
        return this.#email;
    }
}