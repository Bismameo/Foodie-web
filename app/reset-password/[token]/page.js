"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage({ params }) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login?message=Password reset successful. Please login with your new password.");
        }, 3000);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "var(--card-bg)", padding: "3rem", borderRadius: "32px", width: "100%", maxWidth: "450px", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ color: "var(--primary-color)", fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>New Password</h1>
          <p style={{ color: "var(--text-muted)" }}>Enter your new secure password</p>
        </div>

        {success && (
          <div style={{ background: "rgba(46, 213, 115, 0.1)", color: "#2ed573", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(46, 213, 115, 0.2)" }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem", fontSize: "0.9rem", border: "1px solid rgba(255, 71, 87, 0.2)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.5rem", fontWeight: "600" }}>New Password</label>
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--text-muted)" }}>
            Back to <Link href="/login" className="auth-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
