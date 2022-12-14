import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3333'
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.common['Content'] = 'application/json'
api.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, PUT, GET, POST'
api.defaults.headers.common['ngrok-skip-browser-warning'] = 'any'


export default api;



