"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";

import { ApiResponse } from "@/types/api";

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ─── INPUT COMPONENT ───────────────────────────────────────────────────────────
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-sage-200 rounded-xl px-4 py-3 text-sm text-sage-800 bg-white placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all ${
        props.className ?? ""
      }`}
    />
  );
}

// ─── FIELD COMPONENT ───────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium tracking-[0.12em] uppercase text-sage-500">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        setError(result.message);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="w-full max-w-md"
      >
        {/* Clinic Name */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-sage-800 leading-tight mb-2">
            Ashabi
            <br />
            Clinic
          </h1>
          <p className="font-display italic text-xl text-sage-500">
            Doctor Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-sage-100 rounded-2xl shadow-sm p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2">
                Sign In
              </p>
              <h2 className="font-display text-3xl text-sage-800 mb-1">
                Admin Login
              </h2>
              <p className="text-sm text-sage-500">
                Enter your credentials to access the dashboard.
              </p>
            </div>

            <Field
              label="Username"
              error={error && !username ? "Username is required" : ""}
            >
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </Field>

            <Field
              label="Password"
              error={error && !password ? "Password is required" : ""}
            >
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Field>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="text-xs text-red-500">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-sage-100 text-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 text-sm text-sage-600 hover:text-sage-800 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
