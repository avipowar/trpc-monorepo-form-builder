"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignup } from "~/hooks/api/auth";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

interface SignupFormInput {
  fullName: string;
  email: string;
  password: string;
}

export function SignupForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const { createUserWithEmailAndPasswordAsync, status } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInput>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormInput) => {
    setApiError("");

    try {
      await createUserWithEmailAndPasswordAsync({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup failed:", err);
      setApiError(err.message || "Something went wrong during signup.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create your account
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          Join ChaiForms and start building premium forms. ☕
        </p>
      </div>

      {apiError && (
        <div className="mb-6 rounded-xl bg-red-500/10 p-3 border border-red-500/20 text-xs font-medium text-red-500">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            <input
              type="text"
              placeholder="Avinash Powar"
              {...register("fullName", { required: "Full name is required!" })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-red-500 font-medium pl-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            <input
              type="email"
              placeholder="avinash@example.com"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address!",
                },
              })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 font-medium pl-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required!",
                minLength: { value: 6, message: "Password must be at least 6 characters!" },
              })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-4 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 font-medium pl-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "pending"}
          className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-zinc-50 dark:text-zinc-900 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all duration-200 cursor-pointer"
        >
          {status === "pending" ? "Creating Account..." : "Sign Up"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer bg-transparent border-none ml-1"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
