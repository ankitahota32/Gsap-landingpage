/* eslint-disable react/no-unescaped-entities */
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { motion } from "framer-motion";
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Tlogin = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      router.push("/home"); // Redirect to home page after successful login
    },
  });

  const onSubmit = async (data: Tlogin) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <Image
          src="/auth/Login-PNG-Cutout.png"
          alt="Logo"
          width={400}
          height={250}
        />
      </motion.div>
      <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-96">
        <motion.h2
          initial={{ y: -50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="text-2xl text-yellow-900 font-bold text-center"
        >
          Login
        </motion.h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm text-yellow-800 font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-yellow-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-yellow-800 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-yellow-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="text-right mb-4">
            <Link
              href="/otp"
              className="text-sm text-yellow-900 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "#FFD700" }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-black">Don't have an account?</p>
          <Link href="/signup">
            <button className="mt-2 px-4 py-2 text-yellow-900 border border-yellow-950 rounded-md hover:bg-yellow-300 hover:text-white">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
