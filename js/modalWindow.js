function openUserModal() {
    document.getElementById('userModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function createUser() {
    let name = document.getElementById('name').value;
    let nickname = document.getElementById('nickname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Регистрация пользователя с использованием класса User
    let registrationResult = User.register(name, nickname, email, password, confirmPassword);

    if (registrationResult) {
        // Регистрация прошла успешно, продолжите с необходимыми действиями
        // Например, закройте модальное окно и обновите интерфейс
        console.log('Registration successful!');
        app.currentUser = true;
        closeUserModal();
    } else {
        // Регистрация не удалась, предпримите необходимые действия
        // Например, выведите сообщение об ошибке
        console.log('Registration failed. Please check your information.');
    }
}


function saveUserToLocalStorage(user) {
    // Получение текущего списка пользователей из localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Добавление нового пользователя
    users.push(user);

    // Сохранение обновленного списка пользователей в localStorage
    localStorage.setItem('users', JSON.stringify(users));
}

function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
    let order = new Order();
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
        app.cart.clearCart();
        app.displayOrderInfo(order);
        alert("Оплата прошла успешно. Ваш заказ оформлен!");
    } else {
        // Ваш код для неудачной оплаты
        console.log("Что-то пошло не так. Оплата не прошла.");
        alert("Что-то пошло не так. Оплата не прошла.");
    }
}
