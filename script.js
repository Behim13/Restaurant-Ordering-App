import { menuArray } from "/data.js";

const menuEl = document.getElementById("menu");

render();

function render() {
  menuEl.innerHTML = "";
  menuArray.forEach((item) => {
    menuEl.innerHTML += `<div class="menu-item">
    <img src="${item.image}" alt="${item.alt}" />
    <div class="item-info">
        <h2>${item.name}</h2>
        <p>${item.ingredients.join(", ")}</p>
        <p class="item-price">$${item.price}</p>
    </div>
    <button>+</button>
</div>`;
  });
}
