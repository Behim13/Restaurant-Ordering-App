import { menuArray } from "/data.js";

const menuEl = document.getElementById("menu");
const appEl = document.getElementById("app");

appEl.addEventListener("click", handleClickEvent);

function handleClickEvent(e) {
  const button = e.target.closest("button");
  if (!button) return;

  //   Checking what class of btn is clicked
  if ((button.classList.value = "add-btn")) {
    handleAddBtn(button);
  } else if ((button.classList.value = "remove-btn")) {
    handleRemoveBtn(button);
  }
}

// Needed for handleAdd and handleRemoveBtns
let orderHtml = ``;
let totalPrice = 0;

function handleAddBtn(button) {
  // every click it should:
  // 1. if first time, make orderDiv visible
  // 2. finds the item in which the btn is clicked
  // 3. add id to orderHtml
  // 4.

  const orderDiv = document.querySelector(".order");

  //   makes order div visible
  if (orderDiv.classList.value.includes("hidden"))
    orderDiv.classList.remove("hidden");

  const item = menuArray.find((item) => {
    return item.id == button.dataset.id;
  });

  totalPrice += item.price;

  orderHtml += `<div class="order-item">
        <div>
            <h2>${item.name}</h2>
            <button class="remove-btn">remove</button>
        </div>
        <p>$${item.price}</p>
    </div>`;

  orderDiv.innerHTML = `
    <h2 class="order-title">Your order</h2>
    ${orderHtml}
    <div class="order-line"></div>
    <div class="order-totals">
        <h2>Total price:</h2>
        <p>$${totalPrice}</p>
    </div>
    <button class="complete-order-btn">Complete Order</button>
    `;
}

function handleRemoveBtn(button) {
  console.log(button);
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
    <button class = 'add-btn' data-id = '${item.id}'>+</button>
</div>`;
  });
}
