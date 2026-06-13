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
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.8rem", letterSpacing: "-1px" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Login to your foodie account</p>
        </div>

        {message && (
          <div style={{ background: "rgba(var(--primary-rgb), 0.1)", color: "var(--primary)", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(var(--primary-rgb), 0.2)", textAlign: "center", fontWeight: "600" }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(255, 71, 87, 0.2)", textAlign: "center", fontWeight: "600" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.8rem", fontWeight: "700", fontSize: "0.9rem", marginLeft: "1rem" }}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="auth-input"
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", padding: "0 1rem" }}>
              <label style={{ color: "var(--text-main)", fontWeight: "700", fontSize: "0.9rem" }}>Password</label>
              <Link href="/forgot-password" style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "700" }}>
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
            style={{ marginTop: "1.5rem" }}
          >
            {loading ? "Verifying..." : "Login to Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <Link href="/signup" className="auth-link">
              Create Account
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
