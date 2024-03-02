// Функція для отримання курсу криптовалют
function getExchangeRate(currencyPair) {
    return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${currencyPair}`)
        .then(response => response.json())
        .then(data => {
            return data.data.rates[currencyPair];
        });
}

// Функція для здійснення обміну валюти
function exchangeCurrency(amount, fromCurrency, toCurrency) {
    return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.data.rates[toCurrency];
            return amount * exchangeRate;
        });
}

// Приклад використання
const amountToExchange = 100;
const fromCurrency = 'BTC'; // Вхідна криптовалюта
const toCurrency = 'USD'; // Валюта, в яку ми хочемо обміняти

// Отримання курсу обміну
getExchangeRate(`${fromCurrency}-${toCurrency}`)
    .then(exchangeRate => {
        console.log(`Курс ${fromCurrency} до ${toCurrency}: ${exchangeRate}`);
        
        // Здійснення обміну
        return exchangeCurrency(amountToExchange, fromCurrency, toCurrency);
    })
    .then(exchangedAmount => {
        console.log(`${amountToExchange} ${fromCurrency} обмінено на ${exchangedAmount} ${toCurrency}`);
    })
    .catch(error => console.error('Помилка:', error));
