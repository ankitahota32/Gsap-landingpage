import { Api } from "../config";

export const createAcc = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return (await Api.post("/auth/register", data)).data;
};

export const login = async (data: { email: string; password: string }) => {
  return (await Api.post("/auth/login", data)).data;
};

export const otpPass = async (data: { otp: string }) => {
  return (await Api.post("auth/send-reset-otp", data)).data;
};
