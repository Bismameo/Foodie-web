"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="section-padding" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div className="hero-badge" style={{ padding: "0.8rem 1.5rem", borderRadius: "100px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "2rem", color: "var(--primary)" }}>
              📞 Contact Us
            </div>
            <h1 style={{ fontSize: "4rem", fontWeight: "800", marginBottom: "2rem", letterSpacing: "-2px" }}>
              Get in Touch with foo<span style={{ color: "var(--primary)" }}>die</span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "4rem", maxWidth: "700px" }}>
              We'd love to hear from you! Whether you have a question, feedback, or a reservation request, please reach out to us.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "6rem" }}>
              <div style={{ background: "var(--bg-card)", padding: "2.5rem", borderRadius: "30px", border: "1px solid var(--glass-border)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>📍</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.5rem" }}>Our Location</h3>
                <p style={{ color: "var(--text-muted)" }}>123 Spice Route, foodie City, FC 45678</p>
              </div>
              <div style={{ background: "var(--bg-card)", padding: "2.5rem", borderRadius: "30px", border: "1px solid var(--glass-border)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>📱</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.5rem" }}>Phone Number</h3>
                <p style={{ color: "var(--text-muted)" }}>+1 (555) 123-4567</p>
              </div>
              <div style={{ background: "var(--bg-card)", padding: "2.5rem", borderRadius: "30px", border: "1px solid var(--glass-border)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>✉️</span>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.5rem" }}>Email Address</h3>
                <p style={{ color: "var(--text-muted)" }}>info@foodie.com</p>
              </div>
            </div>

            <div style={{ background: "var(--bg-card)", padding: "4rem", borderRadius: "40px", border: "1px solid var(--glass-border)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <span style={{ fontSize: "4rem" }}>✅</span>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "1rem" }}>Message Sent!</h2>
                  <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>Thank you for reaching out. We'll get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn nav-cta" style={{ marginTop: "2rem" }}>Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "3rem" }}>Send Us a Message</h2>
                  <form onSubmit={handleSubmit} style={{ display: "grid", gap: "2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                      <div>
                        <label style={{ display: "block", marginBottom: "0.8rem", fontWeight: "600", color: "var(--text-muted)" }}>Your Name</label>
                        <input type="text" required placeholder="John Doe" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", marginBottom: "0.8rem", fontWeight: "600", color: "var(--text-muted)" }}>Your Email</label>
                        <input type="email" required placeholder="john@example.com" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff" }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.8rem", fontWeight: "600", color: "var(--text-muted)" }}>Subject</label>
                      <input type="text" required placeholder="How can we help?" style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.8rem", fontWeight: "600", color: "var(--text-muted)" }}>Your Message</label>
                      <textarea required rows="6" placeholder="Write your message here..." style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", background: "var(--bg-main)", border: "1px solid var(--glass-border)", color: "#fff", resize: "none" }}></textarea>
                    </div>
                    <button type="submit" className="btn nav-cta" style={{ justifySelf: "start", padding: "1.2rem 4rem !important" }}>Send Message</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
