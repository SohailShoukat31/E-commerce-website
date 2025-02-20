document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");

  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("col-md-4", "mb-3");
      cartItemElement.innerHTML = `
                <div class="card">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
  }

  window.removeFromCart = function (index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  };

  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    checkoutModal.style.display = "block";
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order placed successfully!");
    window.location.href = "index.html";
  });

  renderCartItems();
});
