import axios from 'axios';

// export const BASE_URL_API = 'http://localhost:5000/api/';
export const BASE_URL_API = 'https://test1245.vercel.app/api/';

const BASE_URL = 'http://localhost:5000/api/';
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//     .currentUser.token;

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)
//     .currentUser.token;

export const expireTimeToken = 30;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: { token: `Bearer ${TOKEN}` },
// });
