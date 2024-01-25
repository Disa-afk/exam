// var moviesArray = [
//     new Movie("Barbie", "TBA", 1999, "Comedy/Fantasy"),
//     new Movie("Oppenheimer", "TBA", 1999, "Science-Fiction")
// ];

// var movies = (localStorage.getItem("Movies") === null) ? [] : localStorage.getItem("Movies");

class Cart {
    #items;
    #totalPrice;

    constructor() {
        this.#items = [];
        this.#totalPrice = 0;
    }

    addItem(game) {
        this.#items.push(game);
        this.#totalPrice += game.getPrice();
    }

    removeItem(game) {
        let index = this.#items.indexOf(game);
        if (index !== -1) {
            this.#items.splice(index, 1);
            this.#totalPrice -= game.getPrice();
        }
    }

    getItems() {
        return this.#items;
    }

    getTotalPrice() {
        return this.#totalPrice;
    }

    checkout() {
        // Отправка заказа на оформление
        let order = Library.createOrder(this.user, "Credit Card");
        order.setItems(this.#items);
        order.setTotalPrice(this.#totalPrice);

        // Очистка корзины после оформления заказа
        this.#items = [];
        this.#totalPrice = 0;

        return order;
    }

    renderCart() {
        let cartContainer = document.createElement("div");
        cartContainer.classList.add("cart-container");

        this.#items.forEach(game => {
            let gameContainer = document.createElement("div");
            gameContainer.classList.add("game-container-cart");

            let title = document.createElement("h3");
            title.textContent = game.getTitle();

            let removeButton = document.createElement("button");
            removeButton.textContent = "Удалить";
            removeButton.addEventListener("click", () => this.removeItem(game));

            gameContainer.append(title, removeButton);
            cartContainer.append(gameContainer);
        });

        let totalPrice = document.createElement("p");
        totalPrice.textContent = `Общая сумма: ${this.#totalPrice} Тг`;

        let checkoutButton = document.createElement("button");
        checkoutButton.textContent = "Купить";
        checkoutButton.addEventListener("click", () => this.checkout());

        let clearButton = document.createElement("button");
        clearButton.textContent = "Очистить корзину";
        clearButton.addEventListener("click", () => this.clearCart());

        cartContainer.append(totalPrice, checkoutButton, clearButton);
        document.body.append(cartContainer);
    }

    clearCart() {
        this.#items = [];
        this.#totalPrice = 0;
        this.renderCart();
    }


}
