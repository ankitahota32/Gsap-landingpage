import axios from "axios";

const isProd = process.env.NODE_ENV === "production"

export const Api = axios.create({
  baseURL: "https://gsap-landing-backend.onrender.com/api"
  withCredentials: true,
});
