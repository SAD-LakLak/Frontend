import axios from "axios";

const axiosInstance = axios.create({
    // TODO: READ FROM .ENV
    baseURL: "http://5.34.203.201:8000/api",
    timeout: 5000,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
