import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b50f-177-10-147-105.sa.ngrok.io'
});

export default api;