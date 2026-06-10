"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ color: "var(--primary-color)", fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)" }}>Login to your foodie account</p>
        </div>

        {message && (
          <div style={{ background: "rgba(249, 202, 36, 0.1)", color: "var(--primary-color)", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(249, 202, 36, 0.2)" }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(255, 71, 87, 0.2)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: "600" }}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "var(--bg-main)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <label style={{ color: "var(--text-main)", fontWeight: "600" }}>Password</label>
              <Link href="/forgot-password" className="auth-link" style={{ fontSize: "0.9rem", textDecoration: "underline" }}>
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "var(--bg-main)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link href="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
