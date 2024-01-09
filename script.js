const icon = document.querySelector(".app_icon");
const input = document.getElementById("input");
const from = document.getElementById("from_currency");
const to = document.getElementById("to_currency");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const date = document.querySelector("span");

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  from.add(option);
});

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  to.add(option);
});

from.value = "USD";
to.value = "BDT";

const convertCurrency = async () => {
  const fromCurrency = from.value;
  const toCurrency = to.value;

  try {
    if (input != 0) {
      const url =
        "https://v6.exchangerate-api.com/v6/32c81edcd292d358cb8a3ed1/latest/USD";
      const response = await fetch(url);
      const data = await response.json();

      const fromExchangeRate = data.conversion_rates[fromCurrency];
      const toExchangeRate = data.conversion_rates[toCurrency];
      const convertedAmount = (input.value / fromExchangeRate) * toExchangeRate;

      result.innerHTML = `${
        input.value
      } ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

      date.innerText = `Last Updated: ${data.time_last_update_utc}`;

      // console.log(data);
    }
  } catch (e) {
    alert("Please fill in the amount");
  }
};

btn.addEventListener("click", () => {
  convertCurrency();
  icon.style.transform = "rotate(360deg)";
});
