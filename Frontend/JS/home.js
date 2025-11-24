let registerModal = null;
let loginModal = null;
let homeCurrentPage = 1;
let homeRowsPerPage = 8; 
let homeData = []; 

async function loadWatches() {
    try {
        const response = await api.get("/Watches");
        homeData = response.data;

        renderHomePage(homeCurrentPage);
    } catch (error) {
        console.error(error);
    }
}

function renderHomePage(page) {
    const watchList = document.getElementById("watchList");
    watchList.innerHTML = "";

    const start = (page - 1) * homeRowsPerPage;
    const end = start + homeRowsPerPage;
    const pageData = homeData.slice(start, end);

    pageData.forEach(w => {
        const imageUrl = getFullImageUrl(w.imageUrl);

        watchList.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card shadow-lg">
                    <img src="${imageUrl}" class="card-img-top" alt="${w.name}" style="height: 270px; width: 270px;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${w.name}</h5>
                        <p class="card-text text-danger fs-6 fw-bold text-center">${w.price.toLocaleString()} VND</p>
                    </div>
                </div>
            </div>
        `;
    });

    createPagination({
        totalItems: homeData.length,
        pageSize: homeRowsPerPage,
        currentPage: homeCurrentPage,
        containerId: "paginationHome",
        onPageClick: (page) => {
            homeCurrentPage = page;
            renderHomePage(homeCurrentPage);
        }
    });
}

function updateUIAfterLogin(isLoggedIn) {
    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    const managementDropdown = document.getElementById("managementDropdown");
    const user = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn) {
        btnLogin.classList.add("d-none");
        btnLogout.classList.remove("d-none");
        userGreeting.textContent = `Welcome, ${user.username}!`;
        userGreeting.classList.remove("d-none");
    } else {
        btnLogin.classList.remove("d-none");
        btnLogout.classList.add("d-none");
        userGreeting.textContent = ``;
        userGreeting.classList.add("d-none");
    }

    if (user && user.roles && user.roles.includes("Admin"))
    {
        managementDropdown.classList.remove("d-none");
    }
    else
    {
        managementDropdown.classList.add("d-none");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pathName = window.location.pathname;
    if (pathName.endsWith("home.html")) {
        loadWatches();
        loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
        const user = JSON.parse(localStorage.getItem("user"));
        updateUIAfterLogin(!!user);
    }
});

