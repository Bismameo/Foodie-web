"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?message=Account created successfully. Please login.");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ color: "var(--primary-color)", fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Join foodie</h1>
          <p style={{ color: "var(--text-muted)" }}>Create an account to start ordering</p>
        </div>

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(255, 71, 87, 0.2)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: "600" }}>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "var(--bg-main)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
            />
          </div>

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

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: "600" }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "var(--bg-main)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: "600" }}>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "var(--bg-main)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
