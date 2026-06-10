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
          setSuccess((prev) => (
            <span>
              {prev}
              <Link href={`/reset-password/${data.resetUrl.split("/").pop()}`} style={{ color: "white", textDecoration: "underline", fontWeight: "bold" }}>
                Reset Password Now
              </Link>
            </span>
          ));
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
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ color: "var(--primary-color)", fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>Reset Password</h1>
          <p style={{ color: "var(--text-muted)" }}>Enter your email to receive a reset link</p>
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
          <div style={{ marginBottom: "2rem" }}>
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

          <button
            type="submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--text-muted)" }}>
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
