import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Flavors Hub | Delicious Food Delivered Fast",
  description: "Your favorite meal from the best restaurants delivered to your doorstep in minutes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 2rem" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "800" }}>
                Flavors<span style={{ color: "var(--primary-color)" }}>Hub</span>
              </h1>
            </Link>
            <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <div className="auth-buttons" style={{ display: "flex", gap: "1rem" }}>
                <Link href="/login" className="btn" style={{ padding: "0.5rem 1.2rem", fontSize: "0.9rem" }}>Login</Link>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
                Flavors<span style={{ color: "var(--primary-color)" }}>Hub</span>
              </h2>
              <p style={{ color: "var(--text-muted)" }}>Savor the best flavors in town, delivered right to your door.</p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
              <p>&copy; 2026 Flavors Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
