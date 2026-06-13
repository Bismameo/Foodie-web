"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`Reset link sent! In this demo, click here: `);
        // We'll add a link to the success message if resetUrl is provided
        if (data.resetUrl) {
          const token = data.resetUrl.split("/").pop();
          setSuccess(
            <div style={{ textAlign: "center" }}>
              <p style={{ marginBottom: "1rem" }}>Reset link sent! In this demo, use the button below:</p>
              <Link href={`/reset-password/${token}`} className="auth-btn" style={{ display: "inline-block", textAlign: "center" }}>
                Reset Password Now
              </Link>
            </div>
          );
        }
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2.8rem", fontWeight: "800", marginBottom: "0.8rem", letterSpacing: "-1px" }}>Reset Password</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Enter your email to receive a reset link</p>
        </div>

        {success && typeof success === "string" && (
          <div style={{ background: "rgba(46, 213, 115, 0.1)", color: "#2ed573", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(46, 213, 115, 0.2)", textAlign: "center", fontWeight: "600" }}>
            {success}
          </div>
        )}

        {success && typeof success !== "string" && (
          <div style={{ background: "rgba(46, 213, 115, 0.1)", color: "#2ed573", padding: "1.5rem", borderRadius: "24px", marginBottom: "2rem", border: "1px solid rgba(46, 213, 115, 0.2)" }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255, 71, 87, 0.1)", color: "#ff4757", padding: "1.2rem", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.95rem", border: "1px solid rgba(255, 71, 87, 0.2)", textAlign: "center", fontWeight: "600" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem" }}>
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

          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Remember your password?{" "}
            <Link href="/login" className="auth-link">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
