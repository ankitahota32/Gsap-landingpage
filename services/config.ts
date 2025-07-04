import axios from "axios";


export const Api = axios.create({
  baseURL: "https://gsap-landing-backend.onrender.com/api",
  withCredentials: true,
});
