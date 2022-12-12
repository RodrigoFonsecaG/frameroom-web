import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3fb3-177-10-147-105.sa.ngrok.io'
});

export default api;