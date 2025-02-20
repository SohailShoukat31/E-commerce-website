document.addEventListener("DOMContentLoaded", () => {
  const userType = localStorage.getItem("userType");
  if (userType !== "admin") {
    window.location.href = "index.html";
  }

  showSection("users");
  renderUsers();
  renderProducts();
  renderOrders();
});

function showSection(sectionName) {
  const sections = ["users", "products", "orders"];
  sections.forEach((section) => {
    const sectionElement = document.getElementById(`${section}Section`);
    if (section === sectionName) {
      sectionElement.style.display = "block";
    } else {
      sectionElement.style.display = "none";
    }
  });
}

function renderUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const usersTableBody = document.getElementById("usersTableBody");
  usersTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
    usersTableBody.appendChild(row);
  });
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}
function renderProducts() {
  let products = [];
  try {
    // Parse product from Local Storage
    products =
      JSON.parse(localStorage.getItem("products")) || window.products || [];
  } catch (error) {
    console.error("Error parsing products from localStorage:", error);
    products = window.products || [];
  }

  // Get the table body element
  const productsTableBody = document.getElementById("productsTableBody");
  if (!productsTableBody) {
    console.error("Element with ID 'productsTableBody' not found.");
    return; // Exit the function if the element is not found
  }

  // Clear the table body
  productsTableBody.innerHTML = "";

  // Render products in the table
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
    productsTableBody.appendChild(row);
  });
}

function deleteProduct(index) {
  let products =
    JSON.parse(localStorage.getItem("products")) || window.products;
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function showAddProductModal() {
  const addProductModal = document.getElementById("addProductModal");
  addProductModal.style.display = "block";

  const addProductForm = document.getElementById("addProductForm");
  addProductForm.onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const image = document.getElementById("productImage").value;

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      description,
      image,
    };

    let products =
      JSON.parse(localStorage.getItem("products")) || window.products || [];

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();
    addProductModal.style.display = "none";
    addProductForm.reset();
  };
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersTableBody = document.getElementById("ordersTableBody");
  ordersTableBody.innerHTML = "";

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.items
              .map((item) => `${item.name} (x${item.quantity})`)
              .join(", ")}</td>
        `;
    ordersTableBody.appendChild(row);
  });
}

function logout() {
  localStorage.removeItem("userType");
  window.location.href = "index.html";
}
