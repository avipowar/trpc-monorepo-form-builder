"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignIn } from "~/hooks/api/auth";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [apiError, setApiError] = useState("");
  const { signInUserWithEmailAndPasswordAsync, status } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInput) => {
    setApiError("");

    try {
      await signInUserWithEmailAndPasswordAsync({
        email: data.email,
        password: data.password,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);

      setApiError(err.message || "Invalid email address or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] p-8 shadow-xl">
        {/* Header - Brand Name */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Log in to your ChaiForms account to manage forms. ☕
          </p>
        </div>

        {/* API Error Alert from backend validation */}
        {apiError && (
          <div className="mb-6 rounded-xl bg-red-500/10 p-3 border border-red-500/20 text-xs font-medium text-red-500">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input Section */}
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

          {/* Password Input Field and Buttons will go here next... */}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400 dark:text-zinc-600" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required!",
                })}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-3 pl-11 pr-12 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-all duration-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors bg-transparent border-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 font-medium pl-1">{errors.password.message}</p>
            )}
          </div>
          {/* Submit Button with dynamic loading status */}
          <button
            type="submit"
            disabled={status === "pending"}
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 py-3 text-sm font-semibold text-zinc-50 dark:text-zinc-900 shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all duration-200 cursor-pointer"
          >
            {status === "pending" ? "Logging in..." : "Log In"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        {/* footer */}
        <div className="text-center mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer bg-transparent border-none ml-1"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
