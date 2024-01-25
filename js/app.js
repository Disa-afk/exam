// class App {
//     constructor() {
//         this.getCatalog();
//     }

//     getCatalog() {
//         let movies  = Movie.getMovies();
//         movies.forEach(movie => {
//             let div = document.createElement("div");

//             let h2 = document.createElement("h2");
//             h2.textContent = movie.title;

//             let p = document.createElement("p");
//             p.textContent = movie.price + " Тг";

//             div.append(h2, p);
//             document.body.append(div);
//         })
//     }
// }

class App {
    constructor() {
        this.library = new Library();
        this.cart = new Cart();
        this.order = new Order();
        this.currentUser = null;
        this.isCatalogVisible = false;
        this.renderButtons();
    }

    renderButtons() {
        let buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        let shopButton = document.createElement("button");
        shopButton.textContent = "Магазин";
        shopButton.addEventListener("click", () => this.toggleCatalog());
        buttonsContainer.appendChild(shopButton);

        let cartButton = document.createElement("button");
        cartButton.textContent = "Корзина";
        cartButton.addEventListener("click", () => this.renderCart());
        buttonsContainer.appendChild(cartButton);

        document.body.appendChild(buttonsContainer);
    }

    toggleCatalog() {
        this.clearCart();
        if (this.isCatalogVisible) {
            document.querySelector(".catalog-container")?.remove();
            this.isCatalogVisible = false;
        } else {
            this.renderCatalog();
            this.isCatalogVisible = true;
        }
    }

    renderCatalog() {
        this.clearCart();
        let catalogContainer = document.createElement("div");
        catalogContainer.classList.add("catalog-container");

        let games = this.library.getGames();

        games.forEach(game => {
            let gameContainer = document.createElement("div");
            gameContainer.classList.add("game-container");

            let img = document.createElement("img");
            img.src = game.getImage();
            img.alt = game.getTitle();

            let title = document.createElement("h2");
            title.textContent = game.getTitle();

            let description = document.createElement("p");
            description.textContent = game.getDescription();

            let price = document.createElement("p");
            price.textContent = game.getPrice() + " Тг";
            this.order.setTotalPrice(game.getPrice());

            let buyButton = document.createElement("button");
            buyButton.textContent = "Добавить в корзину";
            buyButton.addEventListener("click", () => this.addToCart(game));

            gameContainer.append(img, title, description, price, buyButton);
            catalogContainer.append(gameContainer);
        });

        document.body.appendChild(catalogContainer);
    }

    addToCart(game) {
        if (this.currentUser) {
            this.cart.addItem(game);
            alert(`Игра "${game.getTitle()}" добавлена в корзину.`);
        } else {
            alert("Необходимо создать пользователя перед добавлением игр в корзину.");
        }
    }

    clearCart() {
        document.querySelector(".cart-container")?.remove();
    }

    renderCart() {
        this.clearCart();
        let cartContainer = document.createElement("div");
        cartContainer.classList.add("cart-container");

        let cartItems = this.cart.getItems();
        let totalPrice = this.cart.getTotalPrice();

        if (cartItems.length === 0) {
            let emptyCartMessage = document.createElement("p");
            emptyCartMessage.textContent = "Корзина пуста.";
            cartContainer.appendChild(emptyCartMessage);
        } else {
            cartItems.forEach(item => {
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                let itemName = document.createElement("h2");
                itemName.textContent = item.getTitle();

                let itemDescription = document.createElement("p");
                itemDescription.textContent = item.getDescription();

                cartItem.append(itemName, itemDescription);
                cartContainer.appendChild(cartItem);
            });

            let totalPriceElement = document.createElement("p");
            totalPriceElement.textContent = `Общая цена: ${totalPrice} Тг`;
            cartContainer.appendChild(totalPriceElement);

            // Добавляем кнопку "Купить"
            let buyButton = document.createElement("button");
            buyButton.textContent = "Купить";
            buyButton.addEventListener("click", () => this.checkout());
            cartContainer.appendChild(buyButton);

            let clearButton = document.createElement("button");
            clearButton.textContent = "Очистить корзину";
            clearButton.addEventListener("click", () => {
                this.cart.clearCart()
                document.querySelector(".cart-container")?.remove();
            });
            cartContainer.appendChild(clearButton);
        }

        document.body.appendChild(cartContainer);
    }

    checkout() {
        if (this.currentUser && this.cart.getTotalPrice() > 0) {
            openPaymentModal();
        } 
        else {
            alert("Необходимо войти в учетную запись и добавить товары в корзину перед оформлением заказа.");
        }
    }

    displayOrderInfo(order) {
        // Ваш код для вывода информации о заказе
        let user = new User(this.currentUser);
        console.log("Заказ оформлен:", order.getDetails(user));
        this.clearCart();
    }

    processPayment() {
        let order = new Order(this.currentUser, "Credit Card");
        let cardNumber = document.getElementById('cardNumber').value;
        let expiryDate = document.getElementById('expiryDate').value;
        let cvv = document.getElementById('cvv').value;

        // Ваш код для передачи данных карты и проведения оплаты
        let paymentInfo = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv
        };

        // Вызываем функцию для проведения оплаты
        if (order.validateCard(paymentInfo)) {
            // Ваш код для успешной оплаты
            console.log("Оплата прошла успешно.");
            
            // Ваши действия после успешной оплаты, например, закрытие модального окна
            closePaymentModal();
            this.cart.clearCart();
            this.displayOrderInfo(order);
            alert("Оплата прошла успешно. Ваш заказ оформлен!");
        } else {
            // Ваш код для неудачной оплаты
            alert("Что-то пошло не так. Оплата не прошла.");
        }
    }


}

