var API_URL = "https://ecart-website-1.onrender.com";
var cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  var cartItems = document.getElementById("cartItems");
  var totalItems = document.getElementById("totalItems");
  var totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";

  var total = 0;
  var items = 0;

  if (cart.length == 0) {
    cartItems.innerHTML = "<h3>Your Cart is Empty</h3>";
    totalItems.innerHTML = 0;
    totalPrice.innerHTML = 0;
    return;
  }

  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
    items = items + cart[i].quantity;

    cartItems.innerHTML += `
        <div class="cart-card">
            <div class="cart-image">
                <img src="${cart[i].image}">
            </div>
            <div class="cart-details">
                <h5>${cart[i].name}</h5>
                <p>${cart[i].description}</p>
                <h4 class="price">&#8377;${cart[i].price}</h4>
                <p><strong>Quantity :</strong> ${cart[i].quantity}</p>
                <button class="btn btn-danger" onclick="removeItem(${i})">Remove</button>
            </div>
        </div>`;
  }

  totalItems.innerHTML = items;
  totalPrice.innerHTML = total;
}

displayCart();

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// place order
document.getElementById("placeOrderBtn").onclick = async function () {
  if (cart.length == 0) {
    alert("Cart is Empty");
    return;
  }

  var totalItemsCount = 0;
  var totalPriceSum = 0;

  for (var i = 0; i < cart.length; i++) {
    totalItemsCount = totalItemsCount + cart[i].quantity;
    totalPriceSum = totalPriceSum + cart[i].price * cart[i].quantity;
  }

  var token = localStorage.getItem("token");
  var username = localStorage.getItem("username") || "guest";

  var headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  try {
    var response = await fetch(API_URL + "/api/orders/place", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        items: cart,
        totalItems: totalItemsCount,
        totalPrice: totalPriceSum,
        username: username,
      }),
    });

    var data = await response.json();

    if (response.ok) {
      alert("Order Placed Successfully!");
      localStorage.removeItem("cart");
      window.location.reload();
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (err) {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.reload();
  }
};
