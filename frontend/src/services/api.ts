import axios from 'axios';

const api = axios.create({
  baseURL: 'https://b50f-177-10-147-105.sa.ngrok.io'
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.common['Content'] = 'application/json'
api.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, PUT, GET, POST'
api.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'


export default api;