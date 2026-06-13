"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCategory } from "../Providers";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { category, setCategory } = useCategory();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const isHome = pathname === "/";

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <nav className="menu">
            <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
              <Link href="/" className="logo-text" onClick={closeMenu}>
                foo<span>die</span>
              </Link>
            </div>

            <div className="menu-items">
              <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
              <Link href="/about" className={pathname === "/about" ? "active" : ""}>Our Story</Link>
              <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
              
              <Link href="/checkout" className="cart-link" style={{ position: "relative", marginLeft: "1rem" }}>
                <span style={{ fontSize: "1.4rem" }}>🛒</span>
                <span className="cart-badge">3</span>
              </Link>
              
              {status === "authenticated" ? (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "1rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: "600" }}>
                    Hi, <span style={{ color: "#fff" }}>{session.user.name.split(" ")[0]}</span>
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="btn nav-cta"
                    style={{ padding: "0.6rem 1.5rem !important", fontSize: "0.8rem !important" }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className={pathname === "/login" ? "active" : ""} style={{ marginLeft: "1rem" }}>Login</Link>
                  <Link href="/signup" className="btn nav-cta">Sign Up</Link>
                </>
              )}
            </div>

            <div 
              className={`hamburger ${isOpen ? "active" : ""}`} 
              onClick={toggleMenu}
            >
              <div className="hamburger-box">
                <div className="hamburger-inner"></div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {isHome && (
        <div className={`category-bar ${scrolled ? "scrolled" : ""}`}>
          <div className="container">
            <div className="nav-categories">
              <button 
                onClick={() => setCategory("delivery")}
                className={`nav-category-btn ${category === "delivery" ? "active" : ""}`}
              >
                🛵 Delivery
              </button>
              <button 
                onClick={() => setCategory("pickup")}
                className={`nav-category-btn ${category === "pickup" ? "active" : ""}`}
              >
                🛍️ Pick-up
              </button>
              <button 
                onClick={() => setCategory("shops")}
                className={`nav-category-btn ${category === "shops" ? "active" : ""}`}
              >
                🏪 Shops
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav ${isOpen ? "active" : ""}`}>
        <Link href="/" onClick={closeMenu} className={pathname === "/" ? "active" : ""}>Home</Link>

        <Link 
          href="/#dishes" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              document.getElementById("dishes")?.scrollIntoView({ behavior: "smooth" });
            }
            closeMenu();
          }}
        >
          Browse Menu
        </Link>
        <Link href="/about" onClick={closeMenu} className={pathname === "/about" ? "active" : ""}>Our Story</Link>
        <Link href="/contact" onClick={closeMenu} className={pathname === "/contact" ? "active" : ""}>Contact</Link>
        <Link href="/checkout" onClick={closeMenu} className={pathname === "/checkout" ? "active" : ""}>My Cart (3)</Link>

        
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {status === "authenticated" ? (
            <>
              <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "20px", border: "1px solid var(--glass-border)" }}>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "5px" }}>Logged in as</p>
                <p style={{ color: "#fff", fontWeight: "800", fontSize: "1.2rem" }}>{session.user.name}</p>
              </div>
              <button 
                onClick={() => { signOut(); closeMenu(); }}
                className="btn nav-cta"
                style={{ width: "100%", padding: "1.2rem !important" }}
              >
                Logout Account
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={closeMenu} style={{ textAlign: "center", border: "none", fontSize: "1.1rem" }}>Already have an account? <span style={{ color: "var(--primary)" }}>Login</span></Link>
              <Link href="/signup" onClick={closeMenu} className="btn nav-cta" style={{ width: "100%", textAlign: "center", padding: "1.2rem !important" }}>Create Account</Link>
            </>
          )}
        </div>
      </div>


      {/* Overlay */}
      <div 
        className={`nav-overlay ${isOpen ? "active" : ""}`} 
        onClick={closeMenu}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1040,
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.4s"
        }}
      ></div>
    </>
  );
}
