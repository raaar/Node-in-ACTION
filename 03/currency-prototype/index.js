var Currency = require('./currency')
  ,	canadianDollar = 0.91;

currency = new Currency(canadianDollar);
console.log(currency.canadianToUS(50));

