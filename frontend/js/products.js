var API_URL = "https://ecart-website-1.onrender.com";
var products = [];

// get products from database
async function loadProducts() {
  try {
    var response = await fetch(API_URL + "/api/products");
    var data = await response.json();
    products = data;
    showProducts(products);
    updateCartCount();
  } catch (err) {
    document.getElementById("productContainer").innerHTML =
      "<p class='text-danger text-center mt-4'>Could not load products. Please start the server.</p>";
  }
}

// display products on page
function showProducts(list) {
  var container = document.getElementById("productContainer");
  container.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    container.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card h-100 shadow">
                <img src="${list[i].image}" class="card-img-top" alt="${list[i].name}">
                <div class="card-body">
                    <h5>${list[i].name}</h5>
                    <p>${list[i].description}</p>
                    <h4 class="text-success">&#8377;${list[i].price}</h4>
                    <div class="rating text-warning mb-2">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <button class="btn btn-primary w-100" onclick="addToCart(${list[i].id})">Add to Cart</button>
                </div>
            </div>
        </div>`;
  }
}

// search products
document.getElementById("searchInput").addEventListener("keyup", function () {
  var searchValue = this.value.toLowerCase();
  var filteredList = [];

  for (var i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().includes(searchValue) ||
      products[i].category.toLowerCase().includes(searchValue)
    ) {
      filteredList.push(products[i]);
    }
  }

  showProducts(filteredList);
});

// add to cart
function addToCart(id) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var selectedProduct = null;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      selectedProduct = products[i];
      break;
    }
  }

  var found = false;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].quantity = cart[i].quantity + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart!");
}

// update cart count in navbar
function updateCartCount() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var count = 0;
  for (var i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  document.getElementById("cartCount").innerHTML = count;
}

loadProducts();
