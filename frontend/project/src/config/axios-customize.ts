import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withCredentials: true
});

instance.interceptors.request.use((config) => {
  if (window?.localStorage?.getItem('access_token')) {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('access_token')}`;
  }

  if(config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = 'application/json';
    config.headers["Content-Type"] = 'application/json';
  }
  
  return config;
});

instance.interceptors.response.use(
  (res) => {
    console.log(res);
    return res.data;
  },
  (error) => {
    console.log(error);
    return error?.response?.config?.method === 'get' ? error?.response?.data : Promise.reject(error);
  }
)



export { instance };