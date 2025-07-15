function addToCartSample() {
  const item = {
    name: "Sample Product",
    price: 499,
    image: "assets/images/sample-product.jpg",
    qty: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((i) => i.name === item.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

function addToCart(name, price, image = "") {
  const cartItem = { name, price, image, qty: 1 };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex((item) => item.name === cartItem.name);

  if (existingIndex !== -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart! 🛒`);
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("contactForm").reset();

  const message = document.getElementById("successMessage");
  message.style.display = "block";

  setTimeout(() => {
    message.style.display = "none";
  }, 4000);
});

document.addEventListener("DOMContentLoaded", () => {
  const accountLink = document.getElementById("accountLink");
  const user = localStorage.getItem("sidmart_user");

  if (accountLink && user) {
    accountLink.textContent = "My Account";
    accountLink.href = "account.html";
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        localStorage.setItem("sidmart_user", email);
        document.getElementById("loginSuccess").style.display = "block";
        setTimeout(() => {
          window.location.href = "account.html";
        }, 1200);
      }
    });
  }

  const userEmail = document.getElementById("userEmail");
  if (userEmail && user) {
    userEmail.textContent = user;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("sidmart_user");
      window.location.href = "index.html";
    });
  }
});

const accountLink = document.getElementById("accountLink");
const user = localStorage.getItem("sidmart_user");
if (accountLink && user) {
  accountLink.textContent = "My Account";
  accountLink.href = "login.html";
}