"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Image from "next/image";
import { otpPass } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

type OTPFormData = {
  otp: string;
};

const validationSchema = Yup.object({
  otp: Yup.string().required("Otp is required"),
});

export default function OTPPage() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

  const otpMutation = useMutation({
    mutationKey: ["otpPass"],
    mutationFn: otpPass,
    onSuccess: () => {
      router.push("/reset-password");
    },
  });

  const onSubmit = async (data: OTPFormData) => {
    await otpMutation.mutateAsync(data);
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
          src="/auth/Lovepik_com-450071314- secure login concept web password vector illustration .png"
          alt="Logo"
          width={400}
          height={250}
        />
      </motion.div>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="bg-gray-100 shadow-lg rounded-lg p-8 w-96"
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl text-black font-bold text-center"
        >
          Enter OTP
        </motion.h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4"
          >
            <label className="block text-sm text-black font-medium">
              OTP Code
            </label>
            <motion.input
              type="text"
              {...register("otp", { required: "OTP is required" })}
              className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:ring focus:border-yellow-600"
              placeholder="Enter OTP"
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.05, backgroundColor: "#000000" }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black"
          >
            Verify OTP
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
