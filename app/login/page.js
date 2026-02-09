"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isInitialized, login } = useAuth();
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isInitialized) return;
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isInitialized, isAuthenticated, router]);

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      await login({ email: data.email, password: data.password });
      router.replace("/");
    } catch (err) {
      setSubmitError(err?.message ?? "Error logging in");
    }
  };

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background font-sans text-dark p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-semibold">
          Welcome
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border-[1.5] border-light px-3 py-2 placeholder:text-light focus:outline-none focus:ring-2"
              placeholder="demo@seek.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-dark-orange">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border-[1.5] border-light px-3 py-2 placeholder:text-light focus:outline-none focus:ring-2"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-dark-orange">
                {errors.password.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="error-message">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-2"
          >
            {isSubmitting ? "Loading..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-light">
          Demo: demo@seek.com / demo123
        </p>
      </div>
    </main>
  );
}
