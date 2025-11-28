let homeCurrentPage = 1;
let homeRowsPerPage = 8;
let homeData = [];

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "all";
const searchQuery = params.get("search") || "";
let titleElement;

const categoryTitle = {
    all: "All Watches",
    men: "Men Watches",
    women: "Women Watches",
    couple: "Couple Watches"
};

async function loadWatches() {
    try {
        const response = await api.get("/Watches");
        homeData = response.data;

        if (category && category.toLocaleLowerCase() !== "all") 
        {
            homeData = homeData.filter(w => w.category?.toLowerCase() === category.toLowerCase());
        }

        if (titleElement) {
            titleElement.textContent = categoryTitle[category] || "All Watches";
        }

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

        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";

        const card = document.createElement("div");
        card.className = "card shadow card-watch align-items-center";

        card.addEventListener("click", () => {
            window.location.href = `watchDetail.html?id=${w.id}`;
        });

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = w.name;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title text-center";
        title.textContent = w.name;

        const price = document.createElement("p");
        price.className = "card-text text-danger fs-6 fw-bold text-center";
        price.textContent = `${w.price.toLocaleString()} VND`;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        watchList.appendChild(col);
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

function renderSearchResults(query, page = 1) {
    const filteredData = homeData.filter(w => 
        w.name.toLowerCase().includes(query.toLowerCase())
    );

    // Render giống renderHomePage nhưng dùng filteredData
    const watchList = document.getElementById("watchList");
    watchList.innerHTML = "";

    const start = (page - 1) * homeRowsPerPage;
    const end = start + homeRowsPerPage;
    const pageData = filteredData.slice(start, end);

    pageData.forEach(w => {
        const imageUrl = getFullImageUrl(w.imageUrl);

        const col = document.createElement("div");
        col.className = "col-md-3 mb-4";

        const card = document.createElement("div");
        card.className = "card shadow card-watch align-items-center";

        card.addEventListener("click", () => {
            window.location.href = `watchDetail.html?id=${w.id}`;
        });

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = w.name;
        img.className = "card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title text-center";
        title.textContent = w.name;

        const price = document.createElement("p");
        price.className = "card-text text-danger fs-6 fw-bold text-center";
        price.textContent = `${w.price.toLocaleString()} VND`;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        watchList.appendChild(col);
    });

    if (titleElement) {
        titleElement.textContent = `Search results for "${query}"`;
    }

    homeCurrentPage = page; // cập nhật trang hiện tại
    createPagination({
        totalItems: filteredData.length,
        pageSize: homeRowsPerPage,
        currentPage: homeCurrentPage,
        containerId: "paginationHome",
        onPageClick: (newPage) => {
            renderSearchResults(query, newPage);
        }
});
}

document.addEventListener("DOMContentLoaded", () => {
    titleElement = document.getElementById("homeTitle");
    const pathName = window.location.pathname;
    if (pathName.endsWith("home.html")) {
        loadWatches().then(() => {
            if (searchQuery) {
                document.getElementById("searchInput").value = searchQuery;
                renderSearchResults(searchQuery);
            }
        });

        const user = JSON.parse(localStorage.getItem("user"));
        updateUIAfterLogin(!!user);
    }
});

