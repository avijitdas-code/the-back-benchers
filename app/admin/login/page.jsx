"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("❌ Invalid email or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-10 w-full max-w-sm text-white text-center">
        <h1 className="text-2xl font-black text-yellow-400 uppercase tracking-wider mb-2">
          Admin Login
        </h1>

        <p className="text-gray-400 text-sm mb-8">
          The Back Benchers
        </p>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 bg-yellow-400 text-black font-black rounded-lg hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}