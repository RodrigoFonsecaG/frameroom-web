import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f85a-177-10-147-105.sa.ngrok.io/'
});

export default api;