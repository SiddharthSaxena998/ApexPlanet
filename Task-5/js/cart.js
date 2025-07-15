document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const cartContainer = document.getElementById("cart-items");
  const itemCount = document.getElementById("item-count");
  const totalPrice = document.getElementById("total-price");
  const orderSection = document.getElementById("order-confirmation");
  const placeOrderBtn = document.getElementById("place-order");

  function updateCartDisplay() {
    cartContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cartItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
  <img src="${item.image || "assets/images/default.png"}" alt="${item.name}" />
  <div class="item-details">
    <h3>${item.name}</h3>
    <p>Price: ₹${item.price}</p>
    <p>Subtotal: ₹${(item.price * item.qty).toFixed(2)}</p>
  </div>
  <div class="item-quantity">
    <button onclick="changeQty(${index}, -1)">-</button>
    <span>${item.qty}</span>
    <button onclick="changeQty(${index}, 1)">+</button>
  </div>
`;

      cartContainer.appendChild(div);

      total += item.price * item.qty;
      count += item.qty;
    });

    itemCount.textContent = count;
    totalPrice.textContent = total.toFixed(2);
  }

  window.changeQty = (index, change) => {
    cartItems[index].qty += change;
    if (cartItems[index].qty <= 0) {
      cartItems.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartDisplay();
  };

  placeOrderBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    cartContainer.innerHTML = "";
    itemCount.textContent = "0";
    totalPrice.textContent = "0.00";
    orderSection.style.display = "block";
  });

  updateCartDisplay();
});