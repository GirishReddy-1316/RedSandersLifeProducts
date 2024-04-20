import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://sore-tan-pangolin-kilt.cyclic.app/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosInstanceWithToken = axios.create({
    baseURL: "https://sore-tan-pangolin-kilt.cyclic.app/api",
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

export { axiosInstanceWithToken, axiosInstance };
