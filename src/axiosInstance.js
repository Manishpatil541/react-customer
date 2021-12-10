import axios from "axios";


const instance1 = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

instance1.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access");
    config.headers.Authorization = token ? `JWT ${token}` : "";
    return config;
});


export default instance1;
// https://ex.com