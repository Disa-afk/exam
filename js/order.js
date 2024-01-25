class Order {
    #user;
    #paymentMethod;
    #dateTime;
    #number;
    #items;
    #totalPrice;

    constructor(user, paymentMethod) {
        this.#user = user;
        this.#paymentMethod = paymentMethod;
        this.#dateTime = new Date();
        this.#number = Math.floor(Math.random() * 1000);
        this.#items = [];
        this.#totalPrice = 0;
    }

    addItem(game) {
        this.#items.push(game);
        this.#totalPrice += game.getPrice();
    }

    setItems(items) {
        this.#items = items;
    }

    setTotalPrice(totalPrice) {
        this.#totalPrice = totalPrice;
    }

    getDetails(user) {
    
        let itemsInfo = this.#items.map(item => {
            return {
                title: item.getTitle(),
            };
        });
    
        return {
            user: user.getNickname(),
            paymentMethod: "Credit Card",
            dateTime: this.#dateTime,
            number: this.#number,
            items: itemsInfo,
            totalPrice: this.#totalPrice
        };
    }

    pay(amount, paymentMethod, cardInfo) {
        // Проверка карты перед оплатой
        if (!this.validateCard(cardInfo)) {
            console.log("Invalid card information. Payment failed.");
            return false;
        }

        // Реализация оплаты заказа
        // Возвращает true, если оплата прошла успешно, иначе false
        // (в данном примере просто симулируем успешную оплату)
        else {
            console.log(`Payment of $${amount} via ${paymentMethod} successful.`);
            return true;
        }
    }

    validateCard(cardInfo) {
        // Проверка номера карты (должен быть 16-значным числом)
        if (!/^\d{16}$/.test(cardInfo.cardNumber)) {
            console.log("Invalid card number.");
            return false;
        }

        // Проверка срока действия карты
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiryDate)) {
            console.log("Invalid expiry date.");
            return false;
        }

        // Проверка CVV-кода
        if (!/^\d{3}$/.test(cardInfo.cvv)) {
            console.log("Invalid CVV code.");
            return false;
        }

        return true;// Все проверки пройдены успешно
    }
}
