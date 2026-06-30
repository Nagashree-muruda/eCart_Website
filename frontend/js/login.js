var API_URL = "https://ecart-website-1mwa.onrender.com";

// switch between login and register tab
function showTab(tab) {
  document.getElementById("error").innerHTML = "";
  document.getElementById("success").innerHTML = "";

  if (tab == "login") {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("registerTab").classList.remove("active");
  } else {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
  }
}

// show hide password for login
document.getElementById("toggleLoginPassword").onclick = function () {
  var input = document.getElementById("loginPassword");
  if (input.type == "password") {
    input.type = "text";
    this.innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    input.type = "password";
    this.innerHTML = '<i class="bi bi-eye"></i>';
  }
};

// show hide password for register
document.getElementById("toggleRegPassword").onclick = function () {
  var input = document.getElementById("regPassword");
  if (input.type == "password") {
    input.type = "text";
    this.innerHTML = '<i class="bi bi-eye-slash"></i>';
  } else {
    input.type = "password";
    this.innerHTML = '<i class="bi bi-eye"></i>';
  }
};

// login form
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    var username = document.getElementById("loginUsername").value.trim();
    var password = document.getElementById("loginPassword").value.trim();

    if (username == "" || password == "") {
      document.getElementById("error").innerHTML = "Please fill all fields";
      return;
    }

    document.getElementById("error").innerHTML = "";

    try {
      var response = await fetch(API_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      var data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "/pages/products.html";
      } else {
        document.getElementById("error").innerHTML = data.message;
      }
    } catch (err) {
      document.getElementById("error").innerHTML = "Cannot connect to server";
    }
  });

// register form
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    var username = document.getElementById("regUsername").value.trim();
    var password = document.getElementById("regPassword").value.trim();
    var confirmPassword = document
      .getElementById("regConfirmPassword")
      .value.trim();

    if (username == "" || password == "" || confirmPassword == "") {
      document.getElementById("error").innerHTML = "Please fill all fields";
      return;
    }

    if (password != confirmPassword) {
      document.getElementById("error").innerHTML = "Passwords do not match";
      return;
    }

    if (password.length < 6) {
      document.getElementById("error").innerHTML =
        "Password must be at least 6 characters";
      return;
    }

    document.getElementById("error").innerHTML = "";

    try {
      var response = await fetch(API_URL + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      var data = await response.json();

      if (response.ok) {
        document.getElementById("success").innerHTML =
          "Account created successfully! Please login.";
        document.getElementById("registerForm").reset();
        setTimeout(function () {
          showTab("login");
        }, 1500);
      } else {
        document.getElementById("error").innerHTML = data.message;
      }
    } catch (err) {
      document.getElementById("error").innerHTML = "Cannot connect to server";
    }
  });
