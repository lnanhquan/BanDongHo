const base = "https://localhost:7123/api";
window.api = axios.create({
    baseURL: base,
    timeout: 10000
});

// Thêm token vào header trước khi gửi request
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Xử lý lỗi response
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized — Token might be expired");
        }
        return Promise.reject(error);
    }
);