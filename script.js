import { menuArray } from "/data.js";

let orderArray = [];

const menuEl = document.getElementById("menu");
const appEl = document.getElementById("app");
const orderDiv = document.querySelector(".order");

appEl.addEventListener("click", handleClickEvent);

function handleClickEvent(e) {
  const button = e.target.closest("button");
  if (!button) return;

  //   Checking what class of btn is clicked
  if (button.classList.value.includes("add-btn")) {
    handleAddBtn(button);
  } else if (button.classList.value.includes("remove-btn")) {
    handleRemoveBtn(button);
  } else if (button.classList.value.includes("complete")) {
    handleCompleteBtn();
  } else if (button.classList.value.includes("pay-btn")) {
    handlePayBtn();
  }
}

function handlePayBtn() {
  // Preventing default form behaviour of reloading page
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".payingCard").classList.add("hidden");
    const name = document.getElementById("input-name").value;

    orderDiv.innerHTML = `<div class='thankYouDiv'>
          <p>Thanks, ${name}! Your order is on its way!</p>
      </div>`;
  });
}

// Needed for handleAdd and handleRemoveBtns
let totalPrice = 0;

function handleAddBtn(button) {
  // every click it should:
  // 1. if first time, make orderDiv visible
  // 2. finds the item in which the btn is clicked
  // 3. add id to orderHtml
  // 4.

  //   makes order div visible
  if (orderDiv.classList.value.includes("hidden"))
    orderDiv.classList.remove("hidden");

  const item = findItemId(button.dataset.id);

  totalPrice += item.price;

  orderArray.push(item);

  renderOrder();
}

function handleRemoveBtn(button) {
  const item = findItemId(button.dataset.id);

  // removing the selected item
  const index = orderArray.findIndex((arrItem) => arrItem.id === item.id);

  if (index !== -1) {
    totalPrice -= item.price;
    orderArray.splice(index, 1);
  }

  renderOrder();
}

function findItemId(id) {
  return menuArray.find((item) => {
    return item.id == id;
  });
}

function handleCompleteBtn() {
  document.querySelector(".payingCard").classList.remove("hidden");
}

function renderOrder() {
  let orderHtml = ``;
  orderArray.forEach((item) => {
    orderHtml += `<div class="order-item">
        <div>
            <h2>${item.name}</h2>
            <button class="remove-btn" data-id='${item.id}'>remove</button>
        </div>
        <p>$${item.price}</p>
    </div>`;
  });

  orderDiv.innerHTML = `
    <h2 class="order-title">Your order</h2>
    ${orderHtml}
    <div class="order-line"></div>
    <div class="order-totals">
        <h2>Total price:</h2>
        <p>$${totalPrice}</p>
    </div>
    <button class="green-btn completeOrder">Complete Order</button>
    `;
}

renderMenu();

function renderMenu() {
  menuEl.innerHTML = "";
  menuArray.forEach((item) => {
    menuEl.innerHTML += `<div class="menu-item">
    <img src="${item.image}" alt="${item.alt}" />
    <div class="item-info">
        <h2>${item.name}</h2>
        <p>${item.ingredients.join(", ")}</p>
        <p class="item-price">$${item.price}</p>
    </div>
    <button class='add-btn' data-id='${item.id}'>+</button>
</div>`;
  });
}
