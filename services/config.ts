import axios from "axios";

const isProd = process.env.NODE_ENV === "production"

export const Api = axios.create({
  baseURL: isProd 
    ? "https://gsap-landing-backend.onrender.com/api"
    : "http://localhost:4000/api",
  withCredentials: true,
});
