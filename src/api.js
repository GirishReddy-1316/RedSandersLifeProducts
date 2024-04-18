import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://sore-tan-pangolin-kilt.cyclic.app/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const token = localStorage.getItem("token");
const axiosInstanceWithToken = axios.create({
    baseURL: "https://sore-tan-pangolin-kilt.cyclic.app/api",
    headers: {
        "authorization": `Bearer ${token}`
    }
});

export { axiosInstanceWithToken, axiosInstance };
