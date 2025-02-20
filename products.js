// Data of Products
const products = [
  {
    // Product 1
    id: 1,
    name: "Toy Cars",
    price: 2000,
    companyName: "play-land",
    description:
      "Toy cars are small, colorful vehicles for kids to push, race, and play",
    image: "images/images (1).jpg",
  },
  {
    // Product 2
    id: 2,
    name: "Dollhouse",
    price: 1000,
    companyName: "play-land",
    description: "Dollhouse is a small house for dolls .",
    image: "images/images (2).jpg",
  },
  {
    // Product 3
    id: 3,
    name: "LEGO Bricks",
    price: 1500,
    companyName: "play-land",
    description:
      " are colorful, interlocking blocks for building creative structures and toys",
    image: "images/lego.png",
  },
  {
    // Product 4
    id: 4,
    name: "Teddy Bear",
    price: 2000,
    companyName: "play-land",
    description: "Teddy Bead soft and sweet with different colors",
    image: "images/teddy.png",
  },
  // Add more products here
];

// Render Products
function renderProducts() {
  const productGrid = document.getElementById("products");
  productGrid.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        `;
    productGrid.appendChild(productCard);
  });
}

// Management in Carts
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((item) => item.id === productId);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartAddedAnimation();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function showCartAddedAnimation() {
  const cartIcon = document.querySelector(".fa-shopping-cart");
  cartIcon.classList.add("cart-animation");
  setTimeout(() => {
    cartIcon.classList.remove("cart-animation");
  }, 1000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});
