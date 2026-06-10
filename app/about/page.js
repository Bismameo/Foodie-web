"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="section-padding" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div className="hero-badge" style={{ padding: "0.8rem 1.5rem", borderRadius: "100px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "2rem", color: "var(--primary)" }}>
              📖 Our Story
            </div>
            <h1 style={{ fontSize: "4rem", fontWeight: "800", marginBottom: "2rem", letterSpacing: "-2px" }}>
              Our Story at foo<span style={{ color: "var(--primary)" }}>die</span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "4rem", lineHeight: "1.8" }}>
              Welcome to foodie, where culinary passion meets authentic flavors. Our journey began with a simple dream:
              to bring the rich, vibrant, and diverse tastes of traditional South Asian cuisine to your table,
              prepared with love and the finest ingredients.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem", marginBottom: "5rem" }}>
              <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "40px", border: "1px solid var(--glass-border)" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "1.5rem", color: "var(--primary)" }}>Our Vision</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  To be more than just a restaurant; we aim to be a culinary destination that celebrates the
                  heritage of our food, creating memorable dining experiences for every guest.
                </p>
              </div>

              <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "40px", border: "1px solid var(--glass-border)" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "1.5rem", color: "var(--primary)" }}>Our Mission</h3>
                <ul style={{ listStyle: "none", padding: 0, color: "var(--text-muted)" }}>
                  <li style={{ marginBottom: "1rem" }}><strong style={{ color: "#fff" }}>Authenticity:</strong> Preserving recipes passed down through generations.</li>
                  <li style={{ marginBottom: "1rem" }}><strong style={{ color: "#fff" }}>Quality:</strong> Sourcing the freshest, highest-quality ingredients.</li>
                  <li><strong style={{ color: "#fff" }}>Experience:</strong> Providing exceptional service in a warm atmosphere.</li>
                </ul>
              </div>
            </div>

            <div style={{ background: "var(--glass)", padding: "4rem", borderRadius: "40px", border: "1px solid var(--glass-border)", marginBottom: "5rem" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1.5rem" }}>Meet Our Team</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>
                Behind every delicious dish is a team of dedicated chefs and culinary experts who pour their heart
                and soul into their craft. Led by our head chef, Chef Ahmad, our team combines years of experience
                with a deep understanding of spices and flavors to create an unparalleled dining experience.
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1.5rem" }}>Our Commitment to You</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>
                At foodie, your satisfaction is our highest priority. We continuously strive to exceed your
                expectations with every visit.
              </p>
              <Link href="/#dishes" className="btn nav-cta">Explore Our Menu</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
