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
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.8rem", letterSpacing: "-1px" }}>New Password</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Enter your new secure password</p>
        </div>

        {success && (
          <div style={{ background: "rgba(46, 213, 115, 0.1)", color: "#2ed573", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(46, 213, 115, 0.2)", textAlign: "center", fontWeight: "600" }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(255, 71, 87, 0.2)", textAlign: "center", fontWeight: "600" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.8rem", fontWeight: "700", fontSize: "0.9rem", marginLeft: "1rem" }}>New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input"
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", color: "var(--text-main)", marginBottom: "0.8rem", fontWeight: "700", fontSize: "0.9rem", marginLeft: "1rem" }}>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="auth-input"
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

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Back to <Link href="/login" className="auth-link">Login to Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
