"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { createAcc } from "@/services/auth";
import { useRouter } from "next/navigation";

type TRegister = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  //defines object schema (validation applied to object with specific fields)
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is running"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  }); // This initializes React Hook Form and integrates Yup validation using yupResolver(schema)

  const router = useRouter();

  const registerMutation = useMutation({
    mutationKey: ["createAcc"],
    mutationFn: createAcc,
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = async (data: TRegister) => {
    registerMutation.mutateAsync(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen bg-white"
    >
      <div className="flex justify-center">
        <Image
          src="/auth/—Pngtree—corona virus info grafis wfh_6558452.png"
          alt="Logo"
          width={400}
          height={250}
        />
      </div>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="bg-gray-100 shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl text-blue-900 font-bold text-center">SignUp</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm text-blue-800 font-medium">
              Name
            </label>
            <input
              type="name"
              {...register("name")}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-blue-800 font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-blue-800 font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-blue-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "00BFFF" }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {registerMutation.isPending ? "Signing Up..." : "Signup"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
