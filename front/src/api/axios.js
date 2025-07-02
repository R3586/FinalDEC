import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-dec.onrender.com",
  withCredentials: true,
});

export default api;
