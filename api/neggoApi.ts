import axios from 'axios';

const neggoApi = axios.create({
    baseURL: '/api'
});



export default neggoApi;