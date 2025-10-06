const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const dropdownImages = document.querySelectorAll(".dropdown img");

for (let i = 0; i < dropdowns.length; i++) {
  const select = dropdowns[i];
  const img = dropdownImages[i];

  for (let currcode in countryList) {
    const option = document.createElement("option");
    option.value = currcode;
    option.innerText = currcode;

    if (select.name === "from" && currcode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    img.src = `https://flagsapi.com/${countryList[select.value]}/flat/64.png`;
  });
}
const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");
const form = document.querySelector("form");

const updateExchangeRate = async (e) => {
  if (e) e.preventDefault();

  let amtVal = Number(amountInput.value);
  if (!amtVal || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromSelect.value.toLowerCase();
  const to = toSelect.value.toLowerCase();

  try {
    const URL = `${BASE_URL}/${from}.json`;
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data[from][to];
    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
  } catch {
    msg.innerText = "Error fetching exchange rate";
  }
};

form.addEventListener("submit", updateExchangeRate);
