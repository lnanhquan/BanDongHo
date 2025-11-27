let loginModal;
let registerModal;

function renderHeader() {
    const headerHTML = `
    <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3 fixed-top">
        <div class="container-fluid">

            <a class="navbar-brand">Watches</a>

            <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                <ul class="navbar-nav flex-grow-1">
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="home.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="home.html?category=men">Men</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="home.html?category=women">Women</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="home.html?category=couple">Couple</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a id="managementDropdown" class="nav-link dropdown-toggle text-dark d-none" href="#"
                           role="button" data-bs-toggle="dropdown" aria-expanded="false">Management</a>
                        <ul class="dropdown-menu" aria-labelledby="managementDropdown">
                            <li><a class="dropdown-item" href="./userManagement.html">Users</a></li>
                            <li><a class="dropdown-item" href="./watch.html">Watches</a></li>
                            <li><a class="dropdown-item" href="./invoice.html">Invoices</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="d-flex ms-auto align-items-center">
                <span id="userGreeting" class="me-2 d-none"></span>
                <button id="btnOrder" class="btn btn-outline-secondary position-relative me-2">
                    <i class="bi bi-receipt"></i>
                </button>
                <button id="btnCart" class="btn btn-outline-success position-relative me-2">
                    <i class="bi bi-cart3"></i>
                    <span id="cartCount" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        0
                    </span>
                </button>
                <button id="btnLogin" class="btn btn-outline-primary me-2" style="margin-left: 5px;">Login</button>
                <button id="btnLogout" class="btn btn-outline-danger d-none" style="margin-left: 5px;">Logout</button>
            </div>

        </div>
    </nav>

    <!-- Pop up login -->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h2 class="modal-title">Login</h2>
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <input type="email" id="loginEmail" class="form-control mb-2" placeholder="Email" autocomplete="email"></input>
                        <input type="password" id="loginPassword" class="form-control mb-2" placeholder="Password" autocomplete="current-password">
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-primary me-2" onclick="login()">Login</button>
                    <button type="button" class="btn btn-success" onclick="switchToRegister()">Register</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Pop up register -->
    <div class="modal fade" id="registerModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h2 class="modal-title">Register</h2>
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <input type="email" id="registerEmail" class="form-control mb-2" placeholder="Email">
                        <input type="text" id="registerUsername" class="form-control mb-2" placeholder="Username" autocomplete="username">
                        <input type="password" id="registerPassword" class="form-control mb-2" placeholder="Password" autocomplete="current-password">
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-success me-2" onclick="register()">Register</button>
                    <button type="button" class="btn btn-secondary" onclick="switchToLogin()">Back to Login</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById("header").insertAdjacentHTML("beforeend", headerHTML);
    document.getElementById("btnLogin").addEventListener("click", openLoginModal);
    document.getElementById("btnLogout").addEventListener("click", logout);

    const user = JSON.parse(localStorage.getItem("user"));

    document.getElementById("btnCart").addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            Swal.fire({
                icon: 'info',
                title: 'Please login',
                text: 'You must be logged in to view your cart.'
            });
            return;
        }
        window.location.href = "cart.html";
    });

    document.getElementById("btnOrder").addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            Swal.fire({
                icon: 'info',
                title: 'Please login',
                text: 'You must be logged in to view your orders.'
            });
            return;
        }
        window.location.href = "order.html";
    });

    updateUIAfterLogin(!!user);
    loadCartCount();
}

async function loadCartCount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        document.getElementById("cartCount").textContent = 0;
        return;
    }

    try {
        const response = await api.get("/CartItems");
        const items = response.data;
        const totalItems = items.length;
        document.getElementById("cartCount").textContent = totalItems;
    } catch (err) {
        console.error("Failed to load cart count:", err);
        document.getElementById("cartCount").textContent = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header");

    if (headerContainer && !headerContainer.querySelector("nav")) {
        renderHeader();
        loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
    }
});