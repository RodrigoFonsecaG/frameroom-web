import axios from 'axios';

const api = axios.create({
  baseURL: 'https://88f9-177-10-147-105.sa.ngrok.io'
});

export default api;