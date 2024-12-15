import axios from 'axios';

const axiosInstance = axios.create({
    // TODO: READ FROM .ENV
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

export default axiosInstance;
