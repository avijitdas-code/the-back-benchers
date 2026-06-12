"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Simple password check — hardcoded for now, easy to upgrade later
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "backbenchers@admin") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("❌ Wrong password. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-10 w-full max-w-sm text-white text-center">
        <h1 className="text-2xl font-black text-yellow-400 uppercase tracking-wider mb-2">Admin Access</h1>
        <p className="text-gray-400 text-sm mb-8">The Back Benchers</p>
        <input
          type="password"
          placeholder="Enter admin password"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 mb-4 text-center focus:outline-none focus:border-yellow-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full p-3 bg-yellow-400 text-black font-black rounded-lg hover:bg-yellow-300 transition">
          Login
        </button>
        {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}