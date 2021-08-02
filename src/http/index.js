import axios from 'axios';

export const API_URL = "http://164.90.174.1";

const $api = axios.create({
    baseURL: API_URL,
    //withCredentials: true
})


$api.interceptors.request.use(config => {
     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
     return config;
})

$api.interceptors.response.use(config => {
    if(config.status === 404) {
        config.data = {message: 'Not found'};
    }
    return config;
})

export default $api;