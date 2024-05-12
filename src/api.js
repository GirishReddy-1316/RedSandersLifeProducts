import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://redsanderslifeserver.onrender.com/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosInstanceWithToken = axios.create({
    baseURL: "https://redsanderslifeserver.onrender.com/api",
    headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

export { axiosInstanceWithToken, axiosInstance };
